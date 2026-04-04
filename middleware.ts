import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware() {
    return;
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Allow login page access
        if (req.nextUrl.pathname === "/admin") {
          return true;
        }
        // Protect all admin sub-routes
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return token?.role === "ADMIN";
        }
        return true;
      },
    },
  },
);

export const config = {
  matcher: ["/admin/:path*"],
};
