import { RefObject } from "react";

const displayImageProperties = (imageRef: CanvasImageSource) => {
  let width: number;
  let height: number;
  let cameraModel = "Unknown Camera";
  let location = "Not Available";

  // Check the type of CanvasImageSource and retrieve width and height accordingly
  if (imageRef instanceof HTMLImageElement) {
    width = imageRef.naturalWidth;
    height = imageRef.naturalHeight;
  } else if (imageRef instanceof HTMLVideoElement) {
    width = imageRef.videoWidth;
    height = imageRef.videoHeight;
  } else if (imageRef instanceof HTMLCanvasElement) {
    width = imageRef.width;
    height = imageRef.height;
  } else {
    // Unsupported type
    alert("Invalid image source. Supported types are HTMLImageElement, HTMLVideoElement, and HTMLCanvasElement.");
    return;
  }

  // Aspect ratio
  const aspectRatio = width / height;

  // Approximate file size in MB (using a base64 encoding approach)
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");

  // Draw the image onto the canvas to estimate file size
  if (context && imageRef instanceof HTMLImageElement) {
    context.drawImage(imageRef, 0, 0);
  }
  const fileSizeMB = (canvas.toDataURL("image/png").length * (3 / 4)) / (1024 * 1024);

  // Device pixel ratio (useful for high-resolution displays)
  const devicePixelRatio = window.devicePixelRatio || 1;

  // Display properties with placeholders for camera and location
  alert(
    `Image Properties:\n` +
    `Width: ${width}px\n` +
    `Height: ${height}px\n` +
    `Aspect Ratio: ${aspectRatio.toFixed(2)}\n` +
    `Approx. File Size: ${fileSizeMB.toFixed(2)} MB\n` +
    `Device Pixel Ratio: ${devicePixelRatio}\n` +
    `Camera Model: ${cameraModel}\n` +
    `Location: ${location}`
  );
};

export default displayImageProperties;
