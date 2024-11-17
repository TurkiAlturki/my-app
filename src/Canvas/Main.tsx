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

  const [savedImage, setSavedImage] = useState<string | null>(null);
  const [showSavedImage, setShowSavedImage] = useState(false);

  // Initialize the canvas
  useEffect(() => {
    const cleanup = initialize(
      canvasRef,
      refContainer,
      fabricCanvasRef,
      ImageSlice.imageUrl,
      setReduxState
    );

    return () => {
      cleanup(); // Cleanup the canvas on component unmount
    };
  }, [ImageSlice.imageUrl]);

  // Handle menu actions
  useEffect(() => {
    if (uperMenu === "Menu_Save_As") {
      menuSaveAs(canvasRef, fabricCanvasRef);
    }
  }, [uperMenu]);

  // Display canvas properties
  const handleDisplayProperties = () => {
    displayProperties(canvasRef, ImageSlice.imageUrl as string);
  };

  // Add a rectangle to the canvas
  const addRectangle = () => {
    if (fabricCanvasRef.current) {
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: "red",
        width: 100,
        height: 100,
      });
      fabricCanvasRef.current.add(rect);
    }
  };

  // Add a circle to the canvas
  const addCircle = () => {
    if (fabricCanvasRef.current) {
      const circle = new fabric.Circle({
        left: 150,
        top: 150,
        fill: "blue",
        radius: 50,
      });
      fabricCanvasRef.current.add(circle);
    }
  };

  // Add a line to the canvas
  const addLine = () => {
    if (fabricCanvasRef.current) {
      const line = new fabric.Line([50, 50, 200, 200], {
        left: 50,
        top: 50,
        stroke: "black",
        strokeWidth: 2,
      });
      fabricCanvasRef.current.add(line);
    }
  };

  // Save the canvas and show the image
  const saveCanvas = () => {
    if (fabricCanvasRef.current) {
      const dataURL = fabricCanvasRef.current.toDataURL();
      setSavedImage(dataURL);
      setShowSavedImage(true);

      // Hide the preview after 1 second
      setTimeout(() => {
        setShowSavedImage(false);
      }, 1000);
    }
  };

  // Undo functionality
  const uNdo = () => {
    if (ImageSlice.undoStack.length > 1 && fabricCanvasRef.current) {
      setReduxState(imageSlice.undo());
      const previousState =
        ImageSlice.undoStack[ImageSlice.undoStack.length - 2];
      fabricCanvasRef.current.loadFromJSON(previousState, () => {
        fabricCanvasRef.current!.renderAll();
      });
    }
  };

  // Redo functionality
  const redo = () => {
    if (ImageSlice.redoStack.length > 0 && fabricCanvasRef.current) {
      setReduxState(imageSlice.redo());
      const nextState = ImageSlice.redoStack[ImageSlice.redoStack.length - 1];
      fabricCanvasRef.current.loadFromJSON(nextState, () => {
        fabricCanvasRef.current!.renderAll();
      });
    }
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
        <div className="absolute bottom-1 right-2 flex gap-2">
          <button
            onClick={uNdo}
            className="flex flex-col items-center justify-center rounded bg-gray-300 p-1 hover:bg-blue-500 hover:text-gray-200"
          >
            <i className="text-3xl">
              <LuChevronLeftCircle />
            </i>
            <p className="text-sm font-semibold">Undo</p>
          </button>
          <button
            onClick={redo}
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
          <button
            onClick={addRectangle}
            className="flex flex-col items-center justify-center rounded bg-gray-300 p-1 hover:bg-purple-500 hover:text-gray-200"
          >
            <p className="text-sm font-semibold">Add Rectangle</p>
          </button>
          <button
            onClick={addCircle}
            className="flex flex-col items-center justify-center rounded bg-gray-300 p-1 hover:bg-purple-500 hover:text-gray-200"
          >
            <p className="text-sm font-semibold">Add Circle</p>
          </button>
          <button
            onClick={addLine}
            className="flex flex-col items-center justify-center rounded bg-gray-300 p-1 hover:bg-purple-500 hover:text-gray-200"
          >
            <p className="text-sm font-semibold">Add Line</p>
          </button>
          <button
            onClick={saveCanvas}
            className="flex flex-col items-center justify-center rounded bg-gray-300 p-1 hover:bg-yellow-500 hover:text-gray-200"
          >
            <p className="text-sm font-semibold">Save</p>
          </button>
        </div>
        {savedImage && (
          <div
            className={`absolute left-2 top-2 bg-white p-2 shadow-lg transition-opacity duration-500 ${
              showSavedImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-sm font-semibold">Saved Image:</p>
            <img
              src={savedImage}
              alt="Saved Canvas"
              className="max-h-48 max-w-full"
            />
          </div>
        )}
      </div>
    );
  } else {
    return <div className="m-auto">You need to upload an image</div>;
  }
}

export default Main;
