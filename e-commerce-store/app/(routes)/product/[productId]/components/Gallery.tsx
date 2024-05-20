"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { type MouseEvent, useState } from "react";

type Props = {
  images: Array<string>;
};
export const Gallery = ({ images }: Props) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const onImgSelect = (e: MouseEvent<HTMLButtonElement>) => {
    setSelectedImage(e.currentTarget.value);
  };
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

      <div className="flex gap-3">
        {images.map((img) => (
          <button
            key={img}
            className={cn(
              "rounded-md w-[75px] h-[80px] border overflow-hidden ring-offset-1",
              selectedImage === img ? "ring-2" : "ring-transparent"
            )}
            onClick={onImgSelect}
            value={img}
          >
            <Image src={img} alt="Product image" width={75} height={80} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};
