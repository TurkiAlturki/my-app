import { GetReduxState, SetReduxState } from "../Redux/Store";
import { PointerEvent as ReactPointerEvent, useEffect, useRef } from "react";
import initialize from "./hjelper/initialize";
import { handleMoving } from "./hjelper/handleMoving";
import Rectangular from "./Functional/Selection/Rectangular";
import Lasso from "./Functional/Selection/Lasso";
import copySelectedAreaToClipboard from "./Functional/Selection/copySelectedAreaToClipboard";
import copySelectedAreaToClipboard2 from "./Functional/Selection/copySelectedAreaToClipboard2";
import cutSelectedAreaToClipboard from "./Functional/Selection/cutSelectedAreaToClipboard";
import cutSelectedAreaToClipboard2 from "./Functional/Selection/cutSelectedAreaToClipboard2";
import pastSelectedAreaToClipboard from "./Functional/Selection/pastSelectedAreaToClipboard";
import menuSaveAs from "./hjelper/menuSaveAs";

function Main() {
  const setReduxState = SetReduxState();
  const uperMenu = GetReduxState((state) => state.AppSettingsSlice.uperMenu);
  const imageUrl = GetReduxState((state) => state.ImageSlice.imageUrl);
  const imageWidth = GetReduxState((state) => state.ImageSlice.imageWidth);
  const rectClip = GetReduxState((state) => state.ImageSlice.rectClip);
  const selectSors = GetReduxState((state) => state.ImageSlice.selectSors);
  const rectClip2 = GetReduxState((state) => state.ImageSlice.rectClip2);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const allowMoving = !["Rectangular", "Lasso"].includes(uperMenu!!);

  useEffect(() => {
    initialize(canvasRef, imageUrl, setReduxState);
  }, [imageUrl]);

  if (uperMenu === "clip_Copy") {
    if (selectSors === "Rectangular") {
      copySelectedAreaToClipboard(rectClip, canvasRef.current!!);
    } else if (selectSors === "Lasso") {
      copySelectedAreaToClipboard2(rectClip2, canvasRef.current!!, canvasRef);
    }
  } else if (uperMenu === "clip_Cute") {
    if (selectSors === "Rectangular") {
      cutSelectedAreaToClipboard(rectClip, canvasRef.current!!, canvasRef);
    } else if (selectSors === "Lasso") {
      cutSelectedAreaToClipboard2(rectClip2, canvasRef.current!!, canvasRef);
    }
  } else if (uperMenu === "clip_Past") {
    pastSelectedAreaToClipboard();
  
} else if (uperMenu === "Menu_Save_As") {
  menuSaveAs(canvasRef);
}
  const handlePointerDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !bgRef.current) return;

    switch (uperMenu) {
      case "Rectangular":
        Rectangular(e, canvasRef, imageUrl!!, setReduxState);
        break;
      case "Lasso":
        Lasso(e, canvasRef, imageUrl!!, setReduxState);
        break;
      default:
        if (allowMoving) {
          handleMoving(e, canvasRef, bgRef, imageWidth);
        }
    }
  };
  function saveImage(canvasRef: React.RefObject<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (canvas) {
      // Convert the canvas to a PNG data URL
      const imageDataURL = canvas.toDataURL("image/png");

      // Create a link element to download the image
      const downloadLink = document.createElement("a");
      downloadLink.href = imageDataURL;
      downloadLink.download = "canvas_image.png";

      // Programmatically click the link to trigger the download
      downloadLink.click();
    } else {
      console.error("Canvas is not available for saving.");
    }
  }
  if (imageUrl) {
    return (
      <div
        ref={bgRef}
        className="relative h-full w-full overflow-hidden bg-gray-300"
      >
        <canvas
          className={`absolute left-0 top-0 m-auto max-h-full max-w-full ${
            allowMoving && "cursor-move"
          }`}
          ref={canvasRef}
          onPointerDown={handlePointerDown}
        />

        <button
          onClick={() => saveImage(canvasRef)}
          className="absolute bottom-4 right-4 rounded bg-blue-500 p-2 text-white"
        >
          Save Image
        </button>
      </div>
    );
  } else {
    return <div className=" m-auto ">You need to upload an image</div>;
  }
}

export default Main;
