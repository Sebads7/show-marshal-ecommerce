"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2, ShoppingBag } from "lucide-react";
import { Cart } from "@/lib/interfaces";

interface SubmitButtonProps {
  buttonName: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

export function SubmitButton({ buttonName, variant }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button variant={variant} disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button variant={variant} type="submit">
          {buttonName}
        </Button>
      )}
    </>
  );
}

export function ShoppingBagButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled size="lg" className="w-full mt-6">
          <Loader2 className="mr-4 h-5 w-5 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button size="lg" className="w-full mt-6" type="submit">
          <ShoppingBag className="mr-4 h-5 w-5" /> Add to bag
        </Button>
      )}
    </>
  );
}

export function RemoveItemButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <button
          disabled
          className="font-medium text-gray-500 pt-2 hover:underline"
        >
          Removing
        </button>
      ) : (
        <button className="font-medium text-red-500 pt-2 hover:underline">
          Delete
        </button>
      )}
    </>
  );
}

export function CheckOutButton({ checkOut }: { checkOut: any }) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled size={"lg"} className="w-full mt-5">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please Wait
        </Button>
      ) : (
        <form action={checkOut}>
          <Button type="submit" size={"lg"} className="w-full mt-5">
            Checkout
          </Button>
        </form>
      )}
    </>
  );
}
