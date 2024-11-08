import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function BannerRoute() {
  return (
    <>
      <div className="flex items-center justify-end">
        <Button asChild className="flex gap-x-2 items-center ">
          <Link href="/dashboard/banner/create">
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Banner</span>
          </Link>
        </Button>
      </div>
    </>
  );
}
