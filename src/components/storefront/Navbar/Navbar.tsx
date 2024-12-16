import Link from "next/link";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NavbarLinks } from "../NavbarLink";
import { UserDropDown } from "../UserDropdown";
import { Button } from "../../ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Cart } from "@/lib/interfaces";
import { redis } from "@/lib/redis";
import ClientCartTotal from "./ClientCartTotal";
import { cookies } from "next/headers";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  let cart: Cart | null = null;
  let sessionId = cookies().get("sessionId")?.value;

  if (sessionId && !user) {
    cart = await redis.get(`cart-${sessionId}`);
  } else if (user) {
    cart = await redis.get(`cart-${user.id}`);
  }

  const total = cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <nav className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8  my-10 border-b border-gray-200 pb-5">
      <div className="flex justify-between items-center w-full ">
        <Link href="/">
          <h1 className="text-black font-bold text-xl lg:text-3xl">
            eSHOES<span className="text-primary">24</span>
          </h1>
        </Link>
        <NavbarLinks />
        <div className="flex items-center">
          {/* /////////// Component to show cart total */}
          <ClientCartTotal total={total} />
          {/* /////////// If user is logged in, show user dropdown */}
          {user ? (
            <>
              <span className="h-6 w-px bg-gray-200 mr-3"></span>
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
            /////// If user is not logged in, show sign in and sign up buttons
            <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2">
              <span className="h-6 w-px bg-gray-200"></span>
              <Button variant="ghost" asChild>
                <LoginLink>Sign In</LoginLink>
              </Button>

              <Button variant="ghost" asChild>
                <RegisterLink>Sign Up</RegisterLink>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
