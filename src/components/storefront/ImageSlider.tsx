"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface ImageSliderProps {
  images: string[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const [mainImage, setMainImage] = useState(images[0]);
  const handleImage = (mainImage: string) => {
    setMainImage(mainImage);
  };
  return (
    <div className="flex  gap-6 md:gap-3 ">
      <div className="w-24 h-10 flex flex-col gap-5">
        {images.map((image, index) => (
          <div
            key={index}
            onMouseEnter={() => handleImage(image)}
            onClick={() => handleImage(image)}
          >
            <Image
              src={image}
              alt="image product"
              width={1000}
              height={1000}
              className={`object-cover w-24 h-24 hover:drop-shadow-md hover:border-2 rounded-md border  ${cn(
                image === mainImage
                  ? "border-gray-500 border-2 rounded-lg"
                  : "border-gray-400"
              )}`}
            />
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-lg  ">
        <Image
          src={mainImage}
          alt="image product"
          width={1000}
          height={1000}
          className="object-cover w-[600px] h-[700px] rounded-lg border border-gray-400"
        />
      </div>
    </div>
  );
}
