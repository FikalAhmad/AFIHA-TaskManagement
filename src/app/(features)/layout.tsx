import { Input } from "@/components/ui/input";
import SidebarMenu from "@/components/SidebarMenu/SidebarMenu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import "@/styles/globals.css";
import { LogOut } from "lucide-react";
import { auth, signOut } from "@/auth";
import { Toaster } from "sonner";

export default async function TaskLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <div className="flex h-screen w-full">
      <div className="flex flex-col m-3 bg-[#F4F4F4] justify-between rounded-xl">
        <div className="w-72 px-3">
          <h1 className="text-2xl font-semibold py-3">Menu</h1>
          <Input
            type="text"
            placeholder="Search"
            className="bg-gray-100 border-2 border-gray-200"
          />
          <div className="mt-5">
            <SidebarMenu />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Button variant="ghost" className="gap-2 justify-normal">
            <Avatar className="w-6 h-6">
              <AvatarImage src={`${session?.user?.image}`} alt="@shadcn" />
              <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            {session?.user?.name}
          </Button>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/signin" });
            }}
          >
            <Button
              variant={"ghost"}
              className="gap-2 justify-normal"
              type="submit"
            >
              <LogOut size={20} color="#000000" />
              Sign out
            </Button>
          </form>
        </div>
      </div>
      {children}
      <Toaster />
    </div>
  );
}
