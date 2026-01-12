"use client";

import Sidebar from "./Sidebar-improved";
import { SidebarProvider, useSidebar } from "./SidebarContext";

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      
      <main
        style={{
          flex: 1,
          marginLeft: isOpen ? "240px" : "0",
          transition: "margin-left 0.3s ease",
          minHeight: "100vh",
        }}
      >
        {children}
      </main>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </SidebarProvider>
  );
}
