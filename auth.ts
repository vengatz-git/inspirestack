import { eq } from "drizzle-orm";
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

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
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
        session.user.showInSearch = user.showInSearch;
        session.user.allowSearchEngineIndexing = user.allowSearchEngineIndexing;
        session.user.notifyComments = user.notifyComments;
        session.user.notifyReplies = user.notifyReplies;
        session.user.notifySaves = user.notifySaves;
        session.user.notifyLikes = user.notifyLikes;
        session.user.notifyFollows = user.notifyFollows;
        session.user.defaultPinVisibility = user.defaultPinVisibility;
        session.user.defaultBoardVisibility = user.defaultBoardVisibility;
      }

      return session;
    },
  },

  events: {
    async signIn({ account, user }) {
      if (account?.provider !== "google" || !user.id || !user.image) {
        return;
      }

      const existingUser = await db.query.users.findFirst({
        where: eq(users.id, user.id),
        columns: {
          googleImage: true,
        },
      });

      if (existingUser?.googleImage) {
        return;
      }

      await db
        .update(users)
        .set({
          googleImage: user.image,
          updatedAt: new Date(),
        })
        .where(eq(users.id, user.id));
    },
  },
});