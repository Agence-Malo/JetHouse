"use client";

import { createContext, useContext, useState } from "react";

interface IActions {
  openView: (view: IContext["view"]) => void;
}

export interface IContext extends IActions {
  view: "nav" | "contact" | null;
}

const ViewContext = createContext<IContext | undefined>(undefined);

export const ViewProvider = ({ children }: { children: React.ReactNode }) => {
  const [view, openView] = useState<IContext["view"]>(null);

  const value = {
    view,
    openView,
  };

  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>;
};

export const useView = (): IContext => {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error("useView must be used within an ViewProvider");
  }
  return context;
};
