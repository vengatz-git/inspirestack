import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string | null;
      role: string;
      isOnboarded: boolean;
    } & DefaultSession["user"];

  }

  interface User {
    username: string | null;
    role: string;
    isOnboarded: boolean;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    username: string | null;
    role: string;
    isOnboarded: boolean;
  }
}