"use client";

import { useRef, useState } from "react";
import { uploadImageToCloudinary } from "@/app/lib/utils";
import { Input } from "@/app/ui/components/input";
import Image from "next/image";

export default function CloudinaryUpload({
  defaultImage,
}: {
  defaultImage?: string;
}) {
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(defaultImage || null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const uploadedUrl = await uploadImageToCloudinary(file);
      if (uploadedUrl) {
        setImageUrl(uploadedUrl);
        if (hiddenInputRef.current) {
          hiddenInputRef.current.value = uploadedUrl;
        }
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleChange}
        disabled={isUploading}
      />

      {isUploading && (
        <p className="text-sm text-muted-foreground">Uploading...</p>
      )}

      {!isUploading && imageUrl && (
        <Image
          width={40}
          height={32}
          src={imageUrl}
          alt="Preview"
          className="w-40 h-32 object-cover border rounded"
        />
      )}

      <input ref={hiddenInputRef} type="hidden" name="image_url" />
    </div>
  );
}
