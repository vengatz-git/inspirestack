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

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),

  session: {
    strategy: "database",
  },

  ...authConfig,
});