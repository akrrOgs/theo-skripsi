"use client";

import Sidebar from "@/components/Admin/Navigation/Sidebar";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      <div
        className={cn(
          "relative bg-blue-900 transition-all duration-300 ease-in-out",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        <button
          className="absolute top-24 -right-5 border-4 border-blue-900 bg-white rounded-2xl p-2 cursor-pointer"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <ArrowRight className="size-4" />
          ) : (
            <ArrowLeft className="size-4" />
          )}
        </button>
        <Sidebar sidebarOpen={sidebarOpen} />
      </div>
      <div className="flex flex-col">
        Navbar
        <main className="p-4 md:p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
