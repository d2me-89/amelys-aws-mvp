"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { SidebarProvider, useSidebar } from "./SidebarContext";

interface AppLayoutContentProps {
  children: ReactNode;
}

function AppLayoutContent({ children }: AppLayoutContentProps) {
  const { isOpen } = useSidebar();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      
      <main
        style={{
          flex: 1,
          marginLeft: isOpen ? "240px" : "70px",
          transition: "margin-left 0.3s ease",
          minHeight: "100vh",
        }}
      >
        {children}
      </main>
    </div>
  );
}

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </SidebarProvider>
  );
}