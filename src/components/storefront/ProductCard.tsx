import Link from "next/link";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

interface ProductItem {
  items: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
  };
}

export function ProductCard({ items }: ProductItem) {
  return (
    <div className="w-full mx-auto  rounded-lg mb-10">
      <div className="w-full">
        <Carousel className=" mx-auto w-full">
          <CarouselContent>
            {items.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[22rem]">
                  <Image
                    src={image}
                    alt=" image"
                    fill
                    className="object-cover object-center w-full h-full"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-16" />
          <CarouselNext className="mr-16" />
        </Carousel>

        <div className="flex justify-between items-center mt-2">
          <h2 className="font-semibold text-xl">{items.name}</h2>
          <p className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10">
            ${items.price}
          </p>
        </div>
        <p className="text-gray-600 text-sm mt-2">{items.description}</p>

        <Button className="w-full mt-4">
          <Link href={`/product/${items.id}`}>Learn More!</Link>
        </Button>
      </div>
    </div>
  );
}

export function LoadingProductCard() {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-full h-80" />
      <div className="flex flex-col mt-2 gap-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="w-full h-6" />
      </div>
      <Skeleton className="w-full h-10 mt-5" />
    </div>
  );
}
