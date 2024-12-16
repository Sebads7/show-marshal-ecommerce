"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

interface HeroCarouselProps {
  data: {
    id: string;
    title: string;
    imageString: string;
    createdAt: Date;
  }[];
}

const HeroCarousel = ({ data }: HeroCarouselProps) => {
  const plugin = React.useRef(Autoplay({ delay: 3000 }));
  return (
    <>
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[plugin.current]}
      >
        <CarouselContent>
          {data.map((item) => (
            <CarouselItem key={item.id}>
              <div className="relative h-[60vh] lg:h-[80vh]">
                <Image
                  src={item.imageString}
                  alt="banner image"
                  fill
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
        {/* <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" /> */}
      </Carousel>
    </>
  );
};

export default HeroCarousel;
