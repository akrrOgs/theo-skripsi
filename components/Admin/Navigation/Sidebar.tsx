import { SIDEBAR_LINK } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const Sidebar = ({ sidebarOpen }: { sidebarOpen: boolean }) => {
  return (
    <div className="p-4 flex flex-col space-y-8">
      {sidebarOpen && (
        <div className="flex flex-col gap-1 bg-gray-100 p-2 rounded-2xl">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="mx-auto"
          />
          <h1 className="text-md text-center font-bold">
            Penjaminan Mutu Internal
          </h1>
        </div>
      )}
      <ul className="flex flex-col gap-3">
        {SIDEBAR_LINK.map(({ name, href, icon }) => (
          <Link
            href={href}
            className="flex items-center font-semibold text-white hover:text-black gap-3 rounded-2xl hover:bg-gray-50 px-4 py-3 hover:border hover:border-black"
            key={name}
          >
            <Image src={icon} alt={name} width={29} height={29} />
            <p>{name}</p>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
