import { RefObject } from "react";

// helper/displayProperties.ts
function displayProperties(canvas: RefObject<HTMLCanvasElement>): void {
  if (!canvas.current) {
    console.error("Canvas is not available for extracting properties.");
    return;
  }
  const x = canvas.current.getBoundingClientRect();
  const properties = {
    width: x.width,
    height: x.height,
    resolution: `${x.width}x${x.height}`,
    format: "PNG", // Assuming PNG if saved as such
    createdDate: new Date().toLocaleDateString(), // Placeholder for current date
  };

  // Display these properties in an alert
  alert(
    `Image Properties:
    Width: ${properties.width}px
    Height: ${properties.height}px
    Resolution: ${properties.resolution}
    Format: ${properties.format}
    Created Date: ${properties.createdDate}`,
  );
}

export default displayProperties;
