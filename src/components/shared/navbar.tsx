import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {  LogOut } from "lucide-react";
import Link from "next/link";
import { auth, signIn, signOut } from "../../../auth";
import {Button} from "@/components/ui/button";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className=" px-5 py-3 ">
      <nav className="flex items-center justify-between">
        <Link href="/">
          {/* <Image src="/logo.png" alt="logo" width={144} height={30} /> */}
          <span className="font-bold text-2xl">Startup</span>
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session?.user ? (
            <>
              <Link href="/startup/create">
                <Button className={'rounded-full'}>Create</Button>
              </Link>

              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 text-red-500 sm:hidden" />
                </button>
              </form>

              <Link href={`/user/${session?.user?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <Button variant={"outline"} type="submit">Login</Button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
