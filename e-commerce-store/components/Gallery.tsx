"use client";

import { useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/Carousel";
import { cn } from "@/lib/utils";

interface Props extends VariantProps<typeof galleryVariants> {
  images: Array<string>;
}

const galleryVariants = cva("rounded-md  ", {
  variants: {
    variant: {
      default: "w-[470px] h-[450px] aspect-square object-cover",
      preview: "w-[400px] h-[220px] object-cover",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const Gallery = ({ images, variant }: Props) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-5">
      <Image
        src={selectedImage}
        alt="Product image"
        className={galleryVariants({ variant })}
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
        <CarouselContent className="p-2 shadow-xl">
          {images.map((img, index) => (
            <CarouselItem
              key={index}
              className={cn(
                "rounded-md aspect-square border overflow-hidden ring-offset-1 basis-[75px] ml-4 pl-0 cursor-pointer",
                selectedImage === img ? "ring-2" : "ring-transparent"
              )}
              onClick={() => setSelectedImage(img)}
            >
              <Image src={img} alt="Product image" width={75} height={80} className="h-full w-full object-cover" />
            </CarouselItem>
          ))}
        </CarouselContent>

        {images.length > 4 && variant !== "preview" ? (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        ) : null}
      </Carousel>
    </div>
  );
};
