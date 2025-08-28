import { auth, signOut } from "@/auth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Navbar = async () => {
  const session = await auth();
  const name = session?.user?.name;
  const role = session?.user?.role;

  return (
    <div className="h-16 flex items-center justify-between bg-white py-3 px-8 border-b border-black/10">
      <h1 className="text-2xl font-semibold hidden md:block">Welcome</h1>

      <Popover>
        <PopoverTrigger className="cursor-pointer">
          <Avatar>
            <AvatarFallback>
              {name ? getInitials({ name: name }) : ""}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="text-center">
          <h1 className="text-lg font-semibold">{name}</h1>
          <h1 className="text-md font-semibold">{role}</h1>
          <hr className="my-2" />
          <form
            action={async () => {
              "use server";

              await signOut({ redirectTo: "/signin" });
            }}
          >
            <Button
              variant="destructive"
              type="submit"
              className="w-full flex gap-1.5 cursor-pointer"
            >
              <LogOut className="size-4 text-white" />
              Log Out
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Navbar;
