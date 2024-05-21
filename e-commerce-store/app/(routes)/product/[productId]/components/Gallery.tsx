"use client";

import { useState } from "react";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/Carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  images: Array<string>;
};
export const Gallery = ({ images }: Props) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-5">
      <Image
        src={selectedImage}
        alt="Product image"
        className="rounded-md object-cover w-[400px] h-[450px]"
        width={400}
        height={450}
        priority
      />

      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full max-w-sm"
      >
        <CarouselContent className="p-2">
          {images.map((img, index) => (
            <CarouselItem
              key={index}
              className={cn(
                "rounded-md  h-[80px] border overflow-hidden ring-offset-1 basis-[75px] ml-4 pl-0 cursor-pointer",
                selectedImage === img ? "ring-2" : "ring-transparent"
              )}
              onClick={() => setSelectedImage(img)}
            >
              <Image src={img} alt="Product image" width={75} height={80} className="h-full w-full object-cover" />
            </CarouselItem>
          ))}
        </CarouselContent>

        {images.length > 4 ? (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        ) : null}
      </Carousel>
    </div>
  );
};
