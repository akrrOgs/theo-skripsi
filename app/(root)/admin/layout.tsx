import Navbar from "@/components/Admin/Navigation/Navbar";
import Sidebar from "@/components/Admin/Navigation/Sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="flex flex-col w-full">
        <Navbar />
        <main className="p-4 md:p-10 bg-gray-50 min-h-screen">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
