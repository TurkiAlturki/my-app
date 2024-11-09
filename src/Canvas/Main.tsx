import { GetReduxState, SetReduxState } from "../Redux/Store";
import ImageUploader from "./hjelper/ImageUploader";
import { PointerEvent as ReactPointerEvent, useEffect, useRef } from "react";
import initialize from "./hjelper/initialize";
import { handleMoving } from "./hjelper/handleMoving";
import Rectangular from "./Functional/Selection/Rectangular";
import Lasso from "./Functional/Selection/Lasso";
import ImagePaster from "./Functional/Selection/ImagePaster";
import copySelectedAreaToClipboard from "./Functional/Selection/copySelectedAreaToClipboard";
import copySelectedAreaToClipboard2 from "./Functional/Selection/copySelectedAreaToClipboard2";

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

  if (uperMenu === "Menu_New") return <ImageUploader />;
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
        <ImagePaster />
      </div>
    );
  }
  return <div>You need to upload an image</div>;
}

export default Main;
