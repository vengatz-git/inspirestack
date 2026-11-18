import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string | null;
      role: string;
      isOnboarded: boolean;
      showInSearch: boolean;
      allowSearchEngineIndexing: boolean;
      notifyComments: boolean;
      notifyReplies: boolean;
      notifySaves: boolean;
      notifyLikes: boolean;
      notifyFollows: boolean;
      defaultPinVisibility: "PUBLIC" | "PRIVATE";
      defaultBoardVisibility: "PUBLIC" | "PRIVATE";
    } & DefaultSession["user"];

  }

  interface User {
    username: string | null;
    role: string;
    isOnboarded: boolean;
    showInSearch: boolean;
    allowSearchEngineIndexing: boolean;
    notifyComments: boolean;
    notifyReplies: boolean;
    notifySaves: boolean;
    notifyLikes: boolean;
    notifyFollows: boolean;
    defaultPinVisibility: "PUBLIC" | "PRIVATE";
    defaultBoardVisibility: "PUBLIC" | "PRIVATE";
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    showInSearch: boolean;
    allowSearchEngineIndexing: boolean;
    notifyComments: boolean;
    notifyReplies: boolean;
    notifySaves: boolean;
    notifyLikes: boolean;
    notifyFollows: boolean;
    defaultPinVisibility: "PUBLIC" | "PRIVATE";
    defaultBoardVisibility: "PUBLIC" | "PRIVATE";
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