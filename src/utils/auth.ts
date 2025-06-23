export function getUserFromToken() {
  const token = localStorage.getItem("refresh_token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload; // { userid, role, ... }
  } catch {
    return null;
  }
}

export function requireAuth(allowedRoles?: string[]) {
  const user = getUserFromToken();
  if (!user) {
    throw new Response("Unauthorized", { status: 302, headers: { Location: "/login" } });
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    throw new Response("Forbidden", { status: 302, headers: { Location: "/login" } });
  }
  return user;
}

export async function refreshAccessToken() {
  const refresh_token = localStorage.getItem("refresh_token");
  if (!refresh_token) return null;
  try {
    const res = await fetch("http://localhost:8000/api/v1/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ refresh_token }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.access_token) {
      localStorage.setItem("access_token", data.access_token);
      return data.access_token;
    }
    return null;
  } catch {
    return null;
  }
}

export async function authFetch(input: RequestInfo, init: RequestInit = {}) {
  const token = localStorage.getItem("access_token");
  let headers = { ...(init.headers || {}), Authorization: token ? `Bearer ${token}` : "" };
  let response = await fetch(input, { ...init, headers });

  if (response.status === 401) {
    // Try to refresh token
    const newToken = await refreshAccessToken();
    if (newToken) {
      headers = { ...headers, Authorization: `Bearer ${newToken}` };
      response = await fetch(input, { ...init, headers });
    }
  }
  return response;
}

