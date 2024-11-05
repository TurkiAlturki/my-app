import React, { useState, ChangeEvent } from "react";
import { imageSlice } from "../../Redux/ImageSlice";
import { SetReduxState } from "../../Redux/Store";
import { appSettingsSlice } from "../../Redux/AppSettingsSlice";

const ImageUploader: React.FC = () => {
  const setReduxState = SetReduxState();

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);

          canvas.toBlob((blob) => {
            if (blob) {
              setReduxState(imageSlice.setImageUrl(URL.createObjectURL(blob)));
              setReduxState(appSettingsSlice.remove());
            }
          }, "image/png");
        }
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
    </div>
  );
};

export default ImageUploader;
