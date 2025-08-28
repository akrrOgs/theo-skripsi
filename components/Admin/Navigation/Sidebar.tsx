"use client";

import { SIDEBAR_LINK } from "@/constants";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Sidebar = () => {
  const isActive = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className={cn(
        "relative bg-blue-900 transition-all duration-300 ease-in-out",
        sidebarOpen ? "w-80" : "w-24"
      )}
    >
      <button
        className={cn(
          "absolute -right-5 border-4 border-blue-900 bg-white rounded-2xl p-2 cursor-pointer",
          sidebarOpen ? "top-29" : "top-20"
        )}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? (
          <ArrowRight className="size-4" />
        ) : (
          <ArrowLeft className="size-4" />
        )}
      </button>

      <div className="flex flex-col space-y-8">
        <div className="p-4">
          <div className="flex flex-col gap-1 bg-gray-100 p-2 rounded-2xl">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="mx-auto"
            />
            {sidebarOpen && (
              <h1 className="text-md text-center font-bold">
                Penjaminan Mutu Internal
              </h1>
            )}
          </div>
        </div>
        <ul className="flex flex-col gap-2 pl-4 w-full">
          {SIDEBAR_LINK.map(({ name, href, icon }) => (
            <Link
              href={href}
              className={cn(
                "flex items-center font-semibold text-white hover:text-black gap-3 rounded-s-xl hover:bg-gray-50 py-3 px-2 hover:border-l-2 hover:border-t-2 hover:border-b-2 hover:border-black",
                isActive === href &&
                  "text-black bg-gray-50 border-l-2 border-t-2 border-b-2 border-black"
              )}
              key={name}
            >
              {sidebarOpen ? (
                <>
                  <Image src={icon} alt={name} width={29} height={29} />
                  <p>{name}</p>
                </>
              ) : (
                <Image
                  src={icon}
                  alt={name}
                  width={30}
                  height={30}
                  className="mx-auto bg-white rounded-2xl p-1"
                />
              )}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
