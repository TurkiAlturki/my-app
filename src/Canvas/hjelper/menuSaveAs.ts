import { RefObject } from "react";

const menuSaveAs = async (canvasRef: RefObject<HTMLCanvasElement>) => {
  if (!canvasRef.current) {
    alert("No canvas to save.");
    return;
  }

  try {
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
            "image/svg+xml": [".svg"]
          },
        },
      ],
    };

    // Show file save dialog
    const fileHandle = await (window as any).showSaveFilePicker(options);
    const writableStream = await fileHandle.createWritable();

    // Extract available formats from the options list for the prompt
    const availableFormats = Object.keys(options.types[0].accept).map(type => type.split("/")[1]);
    let format: string | null = null;

    // Loop until a valid format is entered or user cancels
    while (!format || !availableFormats.includes(format)) {
      format = (prompt(`Enter file format (${availableFormats.join(", ")}):`)?.toLowerCase() || null);

      if (format === null) {
        // User canceled the prompt
        alert("Operation canceled.");
        return;
      }

      if (!availableFormats.includes(format)) {
        alert(`Invalid format. Please enter one of the following: ${availableFormats.join(", ")}.`);
      }
    }

    // Convert the canvas to the chosen format
    const dataUrl = canvasRef.current.toDataURL(`image/${format}`);
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
