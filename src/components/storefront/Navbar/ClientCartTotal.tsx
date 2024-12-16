// ClientCartTotal.tsx
"use client";

import Link from "next/link";
import { ShoppingBagIcon } from "lucide-react";

export default function ClientCartTotal({ total }: { total: number }) {
  return (
    <Link href="/bag" className="group w-fit p-2 flex items-center">
      <ShoppingBagIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-500 cursor-pointer" />
      <span className="ml-2 text-sm font-medium text-white -translate-y-3 -translate-x-3 bg-primary/80 rounded-full px-2 py-px">
        {total}
      </span>
    </Link>
  );
}
