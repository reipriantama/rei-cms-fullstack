"use client";

import { useRef } from "react";
import { uploadImageToCloudinary } from "@/app/lib/utils";

export default function CloudinaryUpload() {
  const imageRef = useRef<HTMLImageElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = await uploadImageToCloudinary(file);

    if (imageUrl) {
      if (imageRef.current) imageRef.current.src = imageUrl;
      if (hiddenInputRef.current) hiddenInputRef.current.value = imageUrl;
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
      />
      <img
        ref={imageRef}
        alt="Preview"
        className="w-40 h-32 object-cover border rounded"
      />
      <input ref={hiddenInputRef} type="hidden" name="image_url" />
    </div>
  );
}
