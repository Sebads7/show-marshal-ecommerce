"use client";

import Image from "next/image";
import { CheckOutButton, RemoveItemButton } from "@/components/SubmitButtons";
import { Cart } from "@/lib/interfaces";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ClientBagProps {
  cart: Cart | null;
  totalPrice: number;
  deleteItem: any;
  checkOut: any;
}

const ClientBag = ({
  cart,
  totalPrice,
  deleteItem,
  checkOut,
}: ClientBagProps) => {
  return (
    <>
      {!cart ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center my-20">
          <div className="flex h-20 w-20 items-center  justify-center rounded-full bg-primary/10">
            <ShoppingBag className="w-10 h-10 text-primary" />
          </div>
          <h2 className="mt-5 font-semibold text-lg">
            You don&apos;t have any products in your Bag
          </h2>
          <Button asChild className="mt-5">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div>
          {cart?.items.map((item: any) => (
            <div className="flex mb-10  " key={item.id}>
              <div className=" w-24 h-24 sm:w-32 sm:h-32 relative">
                <Image
                  src={item.imageString}
                  alt="image"
                  fill
                  className="object-cover rounded-md "
                />
              </div>
              <div className="ml-5 flex justify-between w-full font-medium">
                <p>{item.name}</p>
                <div className="flex flex-col h-full justify-between">
                  <div className="flex flex-col items-center gap-x-2">
                    <div className="flex items-center">
                      <p>{item.quantity} x</p>
                      <p>${item.price}</p>
                    </div>
                    <form action={deleteItem}>
                      <input type="hidden" name="productId" value={item.id} />
                      <RemoveItemButton />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-10">
            <div className="flex items-center justify-between font-medium">
              <p>Subtotal:</p>
              <p>${new Intl.NumberFormat("en-US").format(totalPrice)}</p>
            </div>
            <CheckOutButton checkOut={checkOut} />
          </div>
        </div>
      )}
    </>
  );
};

export default ClientBag;
