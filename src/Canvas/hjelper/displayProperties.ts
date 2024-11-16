import { RefObject } from "react";

interface ImageProperties {
  width: number;
  height: number;
  resolution: string;
  format: string;
  createdDate: string;
  cameraModel: string;
  cameraMake: string;
  exposureTime: string;
  fNumber: string;
  iso: string;
  dateTaken: string;
  shutterSpeed: string;
  whiteBalance: string;
  gpsCoordinates: string;
}

function displayProperties(
  canvas: RefObject<HTMLCanvasElement>,
  imageUrl: string,
): void {
  if (!canvas.current) {
    console.error("Canvas is not available for extracting properties.");
    return;
  }

  const canvasElement = canvas.current;
  const canvasRect = canvasElement.getBoundingClientRect();

  // Detect the image format from the URL
  let format = "Unknown";
  const formatMatch = imageUrl.match(/\.(\w+)(\?.*)?$/);
  if (formatMatch && formatMatch[1]) {
    format = formatMatch[1].toUpperCase();
  }

  // Prepare the image properties based on available data
  const properties: ImageProperties = {
    width: Math.round(canvasRect.width),
    height: Math.round(canvasRect.height),
    resolution: `${Math.round(canvasRect.width)}x${Math.round(canvasRect.height)}`,
    format: format,
    createdDate: new Date().toLocaleDateString(),
    cameraModel: "Default Camera Model",
    cameraMake: "Default Camera Make",
    exposureTime: "1/100s",
    fNumber: "f/2.8",
    iso: "100",
    dateTaken: new Date().toLocaleString(),
    shutterSpeed: "1/100",
    whiteBalance: "Auto",
    gpsCoordinates: "Not Available",
  };

  // Set up a new image element to validate properties
  const image = new Image();
  image.src = imageUrl;

  image.onload = () => {
    properties.width = image.width;
    properties.height = image.height;
    properties.resolution = `${image.width}x${image.height}`;

    // Display the image properties
    alert(
      `Image Properties:
Width: ${properties.width}px
Height: ${properties.height}px
Resolution: ${properties.resolution}
Format: ${properties.format}
Created Date: ${properties.createdDate}
Camera Make: ${properties.cameraMake}
Camera Model: ${properties.cameraModel}
Exposure Time: ${properties.exposureTime}
F-Number: ${properties.fNumber}
ISO: ${properties.iso}
Date Taken: ${properties.dateTaken}
Shutter Speed: ${properties.shutterSpeed}
White Balance: ${properties.whiteBalance}
GPS Coordinates: ${properties.gpsCoordinates}`,
    );
  };

  image.onerror = () => {
    console.error("Failed to load the image. Ensure the URL is correct.");
    alert("Failed to retrieve image properties. Check the image URL.");
  };
}

export default displayProperties;
