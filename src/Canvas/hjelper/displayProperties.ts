// helper/displayProperties.ts
function displayProperties(canvas: HTMLCanvasElement | null): void {
  if (!canvas) {
    console.error("Canvas is not available for extracting properties.");
    return;
  }

  const properties = {
    width: canvas.width,
    height: canvas.height,
    resolution: `${canvas.width}x${canvas.height}`,
    format: 'PNG', // Assuming PNG if saved as such
    createdDate: new Date().toLocaleDateString(), // Placeholder for current date
  };

  // Display these properties in an alert
  alert(
    `Image Properties:
    Width: ${properties.width}px
    Height: ${properties.height}px
    Resolution: ${properties.resolution}
    Format: ${properties.format}
    Created Date: ${properties.createdDate}`
  );
}

export default displayProperties;
