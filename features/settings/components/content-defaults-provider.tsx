"use client";

import { createContext, useContext } from "react";

type ContentDefaults = {
  defaultPinVisibility: "PUBLIC" | "PRIVATE";
  defaultBoardVisibility: "PUBLIC" | "PRIVATE";
};

const ContentDefaultsContext = createContext<ContentDefaults>({
  defaultPinVisibility: "PUBLIC",
  defaultBoardVisibility: "PUBLIC",
});

export function ContentDefaultsProvider({
  children,
  ...defaults
}: ContentDefaults & { children: React.ReactNode }) {
  return (
    <ContentDefaultsContext.Provider value={defaults}>
      {children}
    </ContentDefaultsContext.Provider>
  );
}

export function useContentDefaults() {
  return useContext(ContentDefaultsContext);
}