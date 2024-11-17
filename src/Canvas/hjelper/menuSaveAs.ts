import { RefObject } from "react";
import * as fabric from "fabric";

const menuSaveAs = async (
  canvasRef: RefObject<HTMLCanvasElement>,
  fabricCanvasRef: RefObject<fabric.Canvas | null>,
) => {
  if (!canvasRef.current || !fabricCanvasRef.current) {
    alert("No canvas to save.");
    return;
  }

  try {
    fabricCanvasRef.current.toDataURL();
    const options = {
      types: [
        {
          description: "Images",
          accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpg", ".jpeg"],
            "image/gif": [".gif"],
            "image/bmp": [".bmp"],
            "image/tiff": [".tiff", ".tif"],
            "image/webp": [".webp"],
            "image/x-icon": [".ico"],
            "image/heic": [".heic"],
            "image/svg+xml": [".svg"],
          },
        },
      ],
    };

    // Show file save dialog
    const fileHandle = await (window as any).showSaveFilePicker(options);
    const writableStream = await fileHandle.createWritable();

    // Extract available formats from the options list for the prompt
    const availableFormats = Object.keys(options.types[0].accept).map(
      (type) => type.split("/")[1],
    );
    let format: string | null = null;

    // Loop until a valid format is entered or user cancels
    while (!format || !availableFormats.includes(format)) {
      format =
        prompt(
          `Enter file format (${availableFormats.join(", ")}):`,
        )?.toLowerCase() || null;

      if (format === null) {
        // User canceled the prompt
        alert("Operation canceled.");
        return;
      }

      if (!availableFormats.includes(format)) {
        alert(
          `Invalid format. Please enter one of the following: ${availableFormats.join(
            ", ",
          )}.`,
        );
      }
    }

    // Get the image object from the Fabric.js canvas
    const fabricCanvas = fabricCanvasRef.current;
    const imageObject = fabricCanvas
      .getObjects("image")
      .find((obj) => obj instanceof fabric.Image) as fabric.Image;

    if (!imageObject) {
      alert("No image found on the canvas.");
      return;
    }

    // Create a temporary canvas element
    const tempCanvas = document.createElement("canvas");
    const imgWidth = imageObject.width! * imageObject.scaleX!;
    const imgHeight = imageObject.height! * imageObject.scaleY!;
    tempCanvas.width = imgWidth;
    tempCanvas.height = imgHeight;
    const tempCtx = tempCanvas.getContext("2d");

    if (!tempCtx) {
      alert("Failed to create temporary canvas context.");
      return;
    }

    // Render the image onto the temporary canvas
    tempCtx.drawImage(
      imageObject.getElement() as HTMLImageElement,
      0,
      0,
      imgWidth,
      imgHeight,
    );

    // Convert the temporary canvas to the chosen format
    const dataUrl = tempCanvas.toDataURL(`image/${format}`);
    const blob = await (await fetch(dataUrl)).blob();

    // Write the Blob data to the file
    await writableStream.write(blob);
    await writableStream.close();

    alert("Image saved successfully!");
  } catch (error) {
    console.error("Error saving the image:", error);
    alert("Failed to save the image.");
  }
};

export default menuSaveAs;
