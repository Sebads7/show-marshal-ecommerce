import prisma from "@/lib/db";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";

async function getData() {
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export async function Hero() {
  const data = await getData();
  // console.log(data);
  return (
    <Carousel>
      <CarouselContent>
        {data.map((item) => (
          <CarouselItem key={item.id}>
            <div className="relative h-[60vh] lg:h-[80vh]">
              <Image
                src={item.imageString}
                alt="banner image"
                width={2000}
                height={2000}
                className="object-cover w-full h-full rounded-xl"
              />

              <div className="absolute top-6 left-6 bg-opacity-75 bg-black rounded-xl shadow-lg transition-transform hover:scale-105">
                <p className="text-lg lg:text-xl font-bold text-white p-6 ">
                  {item.title}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-16" />
      <CarouselNext className="mr-16" />
    </Carousel>
  );
}
