import { RefObject } from "react";
import { IRectClip2 } from "../../../Redux/ImageSlice";

const copySelectedAreaToClipboard2 = async (
  points: IRectClip2[],
  canvas: CanvasImageSource,
  canvasRef: RefObject<HTMLCanvasElement>,
) => {
  // Create a temporary canvas to copy the selected area
  const tempCanvas = document.createElement("canvas");
  const tempContext = tempCanvas.getContext("2d");

  if (!tempContext ) return;

  // Set the temp canvas size to match the main canvas
  tempCanvas.width = canvasRef.current?.width as number;
  tempCanvas.height =  canvasRef.current?.height as number;

  // Draw the image and clip the selected area
  tempContext.drawImage(canvas, 0, 0);
  tempContext.globalCompositeOperation = "destination-in";

  // Begin a new path to draw the lasso outline as clipping region
  tempContext.beginPath();
  tempContext.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    tempContext.lineTo(points[i].x, points[i].y);
  }
  tempContext.closePath();
  tempContext.fill();

  // Convert the clipped area to a blob and copy it to clipboard
  tempCanvas.toBlob(async (blob) => {
    if (blob) {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        console.log("Selected area copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy selected area:", err);
      }
    }
  });
};
export default copySelectedAreaToClipboard2;
