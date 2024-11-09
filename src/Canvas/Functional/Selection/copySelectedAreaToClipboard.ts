import { IRectClip } from "../../../Redux/ImageSlice";

// Function to copy the selected area to the clipboard
const copySelectedAreaToClipboard = (
  rect: IRectClip,
  canvas: CanvasImageSource,
) => {
  if (rect.width === 0 || rect.height === 0) return;

  // Create a temporary canvas to copy the selected area
  const tempCanvas = document.createElement("canvas");
  const tempContext = tempCanvas.getContext("2d");

  tempCanvas.width = rect.width;
  tempCanvas.height = rect.height;

  // Copy the selected area from the main canvas
  if (tempContext) {
    tempContext.drawImage(
      canvas,
      rect.startX,
      rect.startY,
      rect.width,
      rect.height,
      0,
      0,
      rect.width,
      rect.height,
    );

    // Convert the selected area to a Blob and copy to clipboard
    tempCanvas.toBlob(async (blob) => {
      if (blob) {
        try {
          // Clipboard API supports only image/png, so this ensures compatibility

          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ]);
          console.log(blob);
          console.log("Selected area copied to clipboard.");
          let rect = { startX: 0, startY: 0, width: 0, height: 0 };
        } catch (error) {
          console.error("Failed to copy to clipboard:", error);
        }
      }
    }, "image/png");
  }
};

export default copySelectedAreaToClipboard;
