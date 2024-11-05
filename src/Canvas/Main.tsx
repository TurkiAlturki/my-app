import { GetReduxState } from "../Redux/Store";
import ImageUploader from "./hjelper/ImageUploader";
import { useEffect, useRef } from "react";
function Main() {
  const uperMenu = GetReduxState((state) => state.AppSettingsSlice.uperMenu);
  const imageUrl = GetReduxState((state) => state.ImageSlice.imageUrl);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.src = imageUrl!!;
      img.onload = () => {
        // Resize the canvas if desired to fit the image
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image on the canvas
        ctx?.drawImage(img, 0, 0, img.width, img.height);
      };
    }
  }, [imageUrl]);

  if (uperMenu === "menu_new") return <ImageUploader />;
  if (imageUrl) return <canvas ref={canvasRef} className="grow bg-gray-300" />;
  return <div>you need to upload an image </div>;
}

export default Main;
