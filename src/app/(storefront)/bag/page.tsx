import { checkOut, deleteItem } from "@/app/actions";

import { Cart } from "@/lib/interfaces";
import { redis } from "@/lib/redis";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { unstable_noStore as noStore } from "next/cache";
import ClientBag from "@/components/storefront/ClientBag/ClientBag";
import { cookies } from "next/headers";

export default async function BagRoute() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  let cart: Cart | null = null;
  let totalPrice = 0;

  let sessionIdCookie = cookies().get("sessionId");
  let sessionId = sessionIdCookie ? sessionIdCookie.value : null;

  if (sessionId && !user) {
    cart = await redis.get(`cart-${sessionId}`);
  } else if (user) {
    cart = await redis.get(`cart-${user.id}`);
  }

  if (cart) {
    cart?.items.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 min-h-[55vh]">
      <ClientBag
        cart={cart}
        totalPrice={totalPrice}
        deleteItem={deleteItem}
        checkOut={checkOut}
      />
    </div>
  );
}
