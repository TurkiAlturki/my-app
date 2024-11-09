import { IRectClip } from "../../../Redux/ImageSlice";
import React from "react";
import { imageSlice } from "../../../Redux/ImageSlice";
import { SetReduxState } from "../../../Redux/Store";
import { appSettingsSlice } from "../../../Redux/AppSettingsSlice";

// Function to upload the selected area from clipboard to a URL
const pasteSelectedAreaToClipboard = async () => {
  const setReduxState = SetReduxState();

  try {
    // Get items from clipboard
    const clipboardItems = await navigator.clipboard.read();

    // Filter to find an image item
    const imageItem = clipboardItems.find((item) =>
      item.types.includes("image/png") || item.types.includes("image/jpeg")
    );

    if (!imageItem) {
      console.error("No image found in clipboard");
      return;
    }

    // Get the image blob from clipboard item
    const blob = await imageItem.getType("image/png") || await imageItem.getType("image/jpeg");

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");

        const maxWidth = 500;
        const scale = img.width > maxWidth ? maxWidth / img.width : 1;
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(async (resizedBlob) => {
            if (resizedBlob) {
              // Update Redux state with the image URL for local use
              setReduxState(imageSlice.setImageUrl(URL.createObjectURL(resizedBlob)));
              setReduxState(appSettingsSlice.remove());

              // Prepare and send the image to the upload URL
              const formData = new FormData();
              formData.append("file", resizedBlob, "pasted_image.png");

              
          
            }
          }, "image/png");
        }
      };
    };
    reader.readAsDataURL(blob);
  } catch (error) {
    console.error("Failed to read from clipboard:", error);
  }
};

export default pasteSelectedAreaToClipboard;
