import Link from "next/link";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBagIcon } from "lucide-react";
import { NavbarLinks } from "./NavbarLink";
import { UserDropDown } from "./UserDropdown";
import { Button } from "../ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export async function Navbar() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();
  return (
    <nav className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between my-10">
      <div className="flex items-center ">
        <Link href="/">
          <h1 className="text-black font-bold text-xl lg:text-3xl">
            Shoe<span className="text-primary">Marshal</span>
          </h1>
        </Link>
        <NavbarLinks />
      </div>

      <div className="flex items-center">
        {user ? (
          <>
            <Link href="/bag" className="group p-2 flex items-center mr-2">
              <ShoppingBagIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                5
              </span>
            </Link>

            <UserDropDown
              email={user.email as string}
              userImage={
                user.picture ??
                `https://avatar.vercel.sh/rauchg/${user.given_name}`
              }
              name={user.given_name as string}
            />
          </>
        ) : (
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2">
            <Button variant="ghost" asChild>
              <LoginLink>Sign In</LoginLink>
            </Button>
            <span className="h-6 w-px bg-gray-200"></span>
            <Button variant="ghost" asChild>
              <RegisterLink>Sign Up</RegisterLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
