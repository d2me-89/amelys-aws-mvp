"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type SidebarContextType = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  // Initialiser directement depuis localStorage (côté client uniquement)
  const [isOpen, setIsOpen] = useState(() => {
    // Cette fonction ne s'exécute qu'une fois au montage
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("sidebar-open");
      return savedState === null ? true : savedState === "true";
    }
    return true; // Fallback pour SSR
  });

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar-open", String(isOpen));
    }
  }, [isOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
}