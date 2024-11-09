import { GetReduxState, SetReduxState } from "../Redux/Store";
import ImageUploader from "./hjelper/ImageUploader";
import { PointerEvent as ReactPointerEvent, useEffect, useRef } from "react";
import initialize from "./hjelper/initialize";
import { handleMoving } from "./hjelper/handleMoving";

function Main() {
  const setReduxState = SetReduxState();
  const uperMenu = GetReduxState((state) => state.AppSettingsSlice.uperMenu);
  const imageUrl = GetReduxState((state) => state.ImageSlice.imageUrl);
  const imageWidth = GetReduxState((state) => state.ImageSlice.imageWidth);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const allowMoving = true;

  useEffect(() => {
    initialize(canvasRef, imageUrl, setReduxState);
  }, [imageUrl]);

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
          onPointerDown={(e) =>
            handleMoving(e, allowMoving, canvasRef, bgRef, imageWidth)
          }
        />
      </div>
    );
  }
  return <div>You need to upload an image</div>;
}

export default Main;
