export function getUserFromToken() {
  const token = localStorage.getItem("access_token");
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