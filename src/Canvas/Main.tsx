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
import displayProperties from "./hjelper/displayProperties";
import arrow from "./Functional/Shapes/Arrow";
import diamond from "./Functional/Shapes/Diamond";
import { LuChevronLeftCircle, LuChevronRightCircle } from "react-icons/lu";
import { imageSlice } from "../Redux/ImageSlice";
function Main() {
  const setReduxState = SetReduxState();
  const uperMenu = GetReduxState((state) => state.AppSettingsSlice.uperMenu);
  const imageUrl = GetReduxState((state) => state.ImageSlice.imageUrl);
  const imageWidth = GetReduxState((state) => state.ImageSlice.imageWidth);
  const rectClip = GetReduxState((state) => state.ImageSlice.rectClip);
  const selectSors = GetReduxState((state) => state.ImageSlice.selectSors);
  const rectClip2 = GetReduxState((state) => state.ImageSlice.rectClip2);

  const redoState = GetReduxState((state) => state.ImageSlice.redo);
  const undoState = GetReduxState((state) => state.ImageSlice.undo);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const allowMoving = !["Rectangular", "Lasso", "Diamond", "Arrow"].includes(
    uperMenu!!,
  );

  useEffect(() => {
    initialize(canvasRef, imageUrl, setReduxState);
  }, [imageUrl]);

  useEffect(() => {
    if (canvasRef.current && undoState.length > 0) {
      const image = new Image();
      image.src = undoState[undoState.length - 1];
      image.onload = () => {
        const canvas = canvasRef.current!!;
        const context = canvas.getContext("2d");
        if (context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
        }
      };
    }
  }, [undoState]);

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
  } else if (uperMenu === "Menu_Prpoerties") {
    displayProperties(canvasRef);
  } else if (uperMenu === "Arrow") {
    arrow(canvasRef.current!!);
  } else if (uperMenu === "Diamond") {
    diamond(canvasRef.current!!);
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
        <div className="absolute bottom-1 right-2 flex gap-1">
          <button
            onClick={() => setReduxState(imageSlice.undo())}
            className=" flex flex-col items-center justify-center rounded bg-gray-300 p-1 hover:bg-blue-500 hover:text-gray-200"
          >
            <i className=" text-3xl">
              <LuChevronLeftCircle />
            </i>
            <p className=" text-sm font-semibold">Undo</p>
          </button>
          <button
            onClick={() => setReduxState(imageSlice.redo())}
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
