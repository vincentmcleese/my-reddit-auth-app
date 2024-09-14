import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    error?: string | null;
    accessToken?: string | null;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      icon_img?: string | null;
      total_karma?: number | null;
      link_karma?: number | null;
      comment_karma?: number | null;
      is_employee?: boolean | null;
      verified?: boolean | null;
    };
  }
  interface Profile {
    icon_img?: string;
    total_karma?: number;
    link_karma?: number;
    comment_karma?: number;
    is_employee?: boolean;
    verified?: boolean;
  }
}
