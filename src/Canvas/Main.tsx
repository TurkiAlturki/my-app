import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { GetReduxState, SetReduxState } from "../Redux/Store";
import menuSaveAs from "./hjelper/menuSaveAs";
import displayProperties from "./hjelper/displayProperties";
import { imageSlice } from "../Redux/ImageSlice";
import { LuChevronLeftCircle, LuChevronRightCircle } from "react-icons/lu";
import initialize from "./hjelper/initialize";

function Main() {
  const setReduxState = SetReduxState();
  const uperMenu = GetReduxState((state) => state.AppSettingsSlice.uperMenu);
  const ImageSlice = GetReduxState((state) => state.ImageSlice);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const refContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initialize(
      canvasRef,
      refContainer,
      fabricCanvasRef,
      ImageSlice.imageUrl,
      setReduxState,
    );
  }, [ImageSlice.imageUrl]);

  useEffect(() => {
    if (uperMenu === "Menu_Save_As") {
      menuSaveAs(canvasRef, fabricCanvasRef);
    }
  }, [uperMenu]);

  // Function to handle displaying canvas properties
  const handleDisplayProperties = () => {
    displayProperties(canvasRef, ImageSlice.imageUrl as string);
  };

  if (ImageSlice.imageUrl) {
    return (
      <div
        ref={refContainer}
        className="relative h-full w-full overflow-hidden bg-[url('./assets/images/viewport-bg.png')]"
      >
        <canvas
          className="absolute bottom-0 left-0 right-0 top-0 m-auto max-h-full max-w-full"
          ref={canvasRef}
        />
        <div className="absolute bottom-1 right-2 flex gap-1">
          <button
            onClick={() => setReduxState(imageSlice.undo())}
            className="flex flex-col items-center justify-center rounded bg-gray-300 p-1 hover:bg-blue-500 hover:text-gray-200"
          >
            <i className="text-3xl">
              <LuChevronLeftCircle />
            </i>
            <p className="text-sm font-semibold">Undo</p>
          </button>
          <button
            onClick={() => setReduxState(imageSlice.redo())}
            className="flex flex-col items-center justify-center rounded bg-gray-300 p-1 hover:bg-blue-500 hover:text-gray-200"
          >
            <i className="text-3xl">
              <LuChevronRightCircle />
            </i>
            <p className="text-sm font-semibold">Redo</p>
          </button>
          <button
            onClick={handleDisplayProperties}
            className="flex flex-col items-center justify-center rounded bg-gray-300 p-1 hover:bg-green-500 hover:text-gray-200"
          >
            <i className="text-3xl">ℹ️</i>
            <p className="text-sm font-semibold">Properties</p>
          </button>
        </div>
      </div>
    );
  } else {
    return <div className="m-auto">You need to upload an image</div>;
  }
}

export default Main;
