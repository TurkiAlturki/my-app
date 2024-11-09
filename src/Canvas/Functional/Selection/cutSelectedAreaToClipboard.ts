import { RefObject } from "react";
import { IRectClip } from "../../../Redux/ImageSlice";

// Function to copy the selected area to the clipboard
const cutSelectedAreaToClipboard = (
  rect: IRectClip,
  canvas: CanvasImageSource,
  canvasRef: RefObject<HTMLCanvasElement>,
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
          const canvasss = canvasRef.current!!;
          const canvasContext = canvasss.getContext("2d");
          if (canvasContext) {
            canvasContext.clearRect(
              rect.startX,
              rect.startY,
              rect.width,
              rect.height,
            );
          }
        } catch (error) {
          alert(`Error accessing clipboard contents: ${error}`);
        }
      }
    }, "image/png");
  }
};

export default cutSelectedAreaToClipboard;
