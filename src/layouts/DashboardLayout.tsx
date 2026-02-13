"use client";

import React from "react";
import clsx from "clsx";
import { useSidebarStore } from "@/stores/sidebarStore";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { isOpen } = useSidebarStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />

      {/* Main Content */}
      <main
        className={clsx(
          "pt-16 transition-all duration-300",
          isOpen ? "md:ml-64" : "md:ml-20",
        )}
      >
        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
