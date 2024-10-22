import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/login",
    error: "/error",
  },
});

export const config = {
  matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"],
};
