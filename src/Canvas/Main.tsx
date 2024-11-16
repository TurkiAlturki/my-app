import { GetReduxState, SetReduxState } from "../Redux/Store";
import { PointerEvent as ReactPointerEvent, useEffect, useRef } from "react";

import { LuChevronLeftCircle, LuChevronRightCircle } from "react-icons/lu";
import { handleMoving } from "./hjelper/handleMoving";
import initialize from "./hjelper/initialize";
function Main() {
  const setReduxState = SetReduxState();
  const uperMenu = GetReduxState((state) => state.AppSettingsSlice.uperMenu);
  const imageUrl = GetReduxState((state) => state.ImageSlice.imageUrl);
  const imageWidth = GetReduxState((state) => state.ImageSlice.imageWidth);

  const undoState = GetReduxState((state) => state.ImageSlice.imageUrl);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const allowMoving = !["Rectangular", "Lasso", "Diamond", "Arrow"].includes(
    uperMenu!!,
  );

  useEffect(() => {
    initialize(canvasRef, imageUrl, setReduxState);
  }, [imageUrl]);



  const handlePointerDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !bgRef.current) return;

    switch (uperMenu) {
      case "Rectangular":
        break;
      case "Lasso":
        /*        Lasso(e, canvasRef, imageUrl!!, setReduxState); */
        break;
      default:
        if (e.ctrlKey) {
          handleMoving(e, canvasRef, bgRef, imageWidth);
          if (allowMoving) {
            canvasRef.current.style.cursor = "move";
          }
        }
    }
  };

  if (imageUrl) {
    return (
      <div
        ref={bgRef}
        className={`relative h-full w-full overflow-hidden bg-[url('./assets/images/viewport-bg.png')]`}
      >
        <canvas
          className="absolute left-0 top-0 m-auto max-h-full max-w-full"
          ref={canvasRef}
          onPointerDown={handlePointerDown}
        />
        <div className="absolute bottom-1 right-2 flex gap-1">
          <button
            onClick={() => console.log()}
            className=" flex flex-col items-center justify-center rounded bg-gray-300 p-1 hover:bg-blue-500 hover:text-gray-200"
          >
            <i className=" text-3xl">
              <LuChevronLeftCircle />
            </i>
            <p className=" text-sm font-semibold">Undo</p>
          </button>
          <button
            onClick={() => console.log()}
            className=" flex flex-col items-center justify-center rounded bg-gray-300 p-1 hover:bg-blue-500 hover:text-gray-200"
          >
            <i className=" text-3xl">
              <LuChevronRightCircle />
            </i>
            <p className=" text-sm font-semibold">Redo</p>
          </button>
        </div>
      </div>
    );
  } else {
    return <div className=" m-auto ">You need to upload an image</div>;
  }
}

export default Main;
