"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type SidebarContextType = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  // Initialiser avec true par défaut, sera mis à jour après le montage
  const [isOpen, setIsOpen] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Charger l'état depuis localStorage au montage
  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-open");
    if (savedState !== null) {
      setIsOpen(savedState === "true");
    }
    setIsInitialized(true);
  }, []);

  // Sauvegarder l'état dans localStorage à chaque changement
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("sidebar-open", String(isOpen));
    }
  }, [isOpen, isInitialized]);

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