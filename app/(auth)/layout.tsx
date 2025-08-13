import Image from "next/image";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="h-screen flex items-center justify-center p-6 md:p-8 bg-gray-200"
      style={{
        backgroundImage: "url('/images/bg.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="border border-black/25 flex flex-col lg:flex-row w-full max-w-4xl mx-auto bg-blue-300/15 bg-opacity-30 backdrop-filter backdrop-blur-xl rounded-xl shadow-md shadow-black overflow-hidden">
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {children}
        </div>
        <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="w-full">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={200}
                height={200}
                className="mx-auto"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Penjaminan Mutu Internal
              </h2>
              <p className="opacity-70">
                Membantu organisasi dalam memantau, mengelola, dan meningkatkan
                kualitas produk atau layanan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
