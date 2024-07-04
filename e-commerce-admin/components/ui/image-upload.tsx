"use client";

import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "./button";
import Image from "next/image";

type Props = {
  values: Array<string>;
  onChange: (urlsToAdd: Array<string>) => void;
  onDelete: (urlToDelete: string) => void;
  disabled?: boolean;
};
export const ImageUpload = ({ values, onDelete, onChange, disabled }: Props) => {
  const onQueuesEnd = (result: any) => {
    const urls: Array<string> = result.info.files.map(
      (file: { uploadInfo: { secure_url: string } }) => file.uploadInfo.secure_url
    );
    onChange(urls);
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {values.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <Button
              onClick={() => onDelete(url)}
              variant="destructive"
              type="button"
              size="sm"
              className="absolute right-2 top-2 z-10"
            >
              <Trash className="h-4 w-4" />
            </Button>
            <Image src={url} alt="billboard-image" fill className="object-cover" />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onQueuesEnd={onQueuesEnd}
        uploadPreset="tertci0e"
        options={{
          clientAllowedFormats: ["jpg", "png", "webp"],
          maxFileSize: 2097152 /* 2MB */,
        }}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button type="button" disabled={disabled} variant="secondary" onClick={onClick}>
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
