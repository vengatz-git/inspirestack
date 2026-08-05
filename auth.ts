import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import authConfig from "./auth.config";
import { db } from "@/db";


import {
  users,
  accounts,
  sessions,
  verificationTokens,
} from "@/db/schema/auth";

export const { handlers, auth, signIn, signOut, unstable_update} = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),

  ...authConfig,

  callbacks: {
    ...authConfig.callbacks,

    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.username = user.username;
        session.user.role = user.role;
        session.user.isOnboarded = user.isOnboarded;
      }

      return session;
    },
  },
});