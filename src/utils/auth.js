// auth.js
export function requireAdminAuth() {
  const token = localStorage.getItem("access_token"); // or use cookies

  if (!token) {
    throw new Response("Unauthorized", {
      status: 302,
      headers: {
        Location: "/login", // redirect if not authenticated
      },
    });
  }

  // Decode the token and check if user is admin
  const payload = JSON.parse(atob(token.split(".")[1]));

  if (payload.role !== "admin") {
    throw new Response("Forbidden", {
      status: 302,
      headers: {
        Location: "/login",
      },
    });
  }

  return payload; // Return decoded user info if needed
}
