import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { GetReduxState, SetReduxState } from "../Redux/Store";
import menuSaveAs from "./hjelper/menuSaveAs";
import displayProperties from "./hjelper/displayProperties";

import { LuChevronLeftCircle, LuChevronRightCircle } from "react-icons/lu";

function Main() {
  const setReduxState = SetReduxState();
  const uperMenu = GetReduxState((state) => state.AppSettingsSlice.uperMenu);
  const imageUrl = GetReduxState((state) => state.ImageSlice.imageUrl);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const refContainer = useRef<HTMLDivElement>(null);

  const undoStack = useRef<string[]>([]);
  const redoStack = useRef<string[]>([]);
  const saveCanvasState = () => {
    if (fabricCanvasRef.current) {
      const canvasJson = JSON.stringify(fabricCanvasRef.current);
      if (undoStack.current[undoStack.current.length - 1] !== canvasJson) {
        undoStack.current.push(canvasJson);
        redoStack.current = [];
      }
    }
  };

  useEffect(() => {
    if (canvasRef.current && refContainer.current) {
      const container = refContainer.current.getBoundingClientRect();
      canvasRef.current.width = container.width;
      canvasRef.current.height = container.height;
      fabricCanvasRef.current = new fabric.Canvas(canvasRef.current);

      if (imageUrl && fabricCanvasRef.current) {
        const loadImage = async () => {
          try {
            // Fetch the image as a Blob
            const response = await fetch(imageUrl, { mode: "cors" });
            const blob = await response.blob();

            // Read EXIF data from the Blob


            // Create an Object URL from the Blob
            const objectURL = URL.createObjectURL(blob);

            const img = await fabric.Image.fromURL(objectURL, {
              crossOrigin: "anonymous",
            });
            // Revoke the Object URL after the image is loaded
            URL.revokeObjectURL(objectURL);

            // Get canvas dimensions
            const canvasWidth = fabricCanvasRef.current!.getWidth();
            const canvasHeight = fabricCanvasRef.current!.getHeight();

            // Calculate scaling factor to fit image within canvas
            const scaleX = canvasWidth / img.width!;
            const scaleY = canvasHeight / img.height!;
            const scale = Math.min(scaleX, scaleY);

            // Scale and center the image
            img.scale(scale);
            img.set({
              left: (canvasWidth - img.getScaledWidth()) / 2,
              top: (canvasHeight - img.getScaledHeight()) / 2,
              selectable: false,
              evented: false,
            });

            fabricCanvasRef.current!.add(img);
            fabricCanvasRef.current!.renderAll();

            // Save initial canvas state
            saveCanvasState();
          } catch (error) {
            console.error(
              "Error loading image or extracting EXIF data:",
              error,
            );
          }
        };
        loadImage();
      }

      // Listen for changes on the canvas
      fabricCanvasRef.current.on("object:added", saveCanvasState);
      fabricCanvasRef.current.on("object:modified", saveCanvasState);
      fabricCanvasRef.current.on("object:removed", saveCanvasState);
    }

    // Clean up on component unmount
    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.off("object:added", saveCanvasState);
        fabricCanvasRef.current.off("object:modified", saveCanvasState);
        fabricCanvasRef.current.off("object:removed", saveCanvasState);
        fabricCanvasRef.current.dispose();
      }
    };
  }, [imageUrl]);

  useEffect(() => {
    if (uperMenu === "Menu_Save_As") {
      menuSaveAs(canvasRef, fabricCanvasRef);
    }
  }, [uperMenu]);

  const handleUndo = () => {
    if (undoStack.current.length > 1 && fabricCanvasRef.current) {
      // Remove the current state
      const currentState = undoStack.current.pop();
      // Push it onto the redo stack
      if (currentState) {
        redoStack.current.push(currentState);
      }
      // Get the previous state
      const previousState = undoStack.current[undoStack.current.length - 1];
      // Load the previous state onto the canvas
      fabricCanvasRef.current.loadFromJSON(previousState, () => {
        fabricCanvasRef.current!.renderAll();
      });
    }
  };

  const handleRedo = () => {
    if (redoStack.current.length > 0 && fabricCanvasRef.current) {
      // Pop the last state from the redo stack
      const nextState = redoStack.current.pop();
      if (nextState) {
        // Save the current state to the undo stack
        const currentState = JSON.stringify(fabricCanvasRef.current);
        undoStack.current.push(currentState);
        // Load the next state onto the canvas
        fabricCanvasRef.current.loadFromJSON(nextState, () => {
          fabricCanvasRef.current!.renderAll();
        });
      }
    }
  };

  // Function to handle displaying canvas properties
  const handleDisplayProperties = () => {
    displayProperties(canvasRef, imageUrl as string);
  };

  if (imageUrl) {
    return (
      <div
        ref={refContainer}
        className="relative h-full w-full overflow-hidden bg-[url('./assets/images/viewport-bg.png')]"
      >
        <canvas
          className="absolute left-0 top-0 m-auto max-h-full max-w-full"
          ref={canvasRef}
        />
        <div className="absolute bottom-1 right-2 flex gap-1">
          <button
            onClick={handleUndo}
            className="flex flex-col items-center justify-center rounded bg-gray-300 p-1 hover:bg-blue-500 hover:text-gray-200"
          >
            <i className="text-3xl">
              <LuChevronLeftCircle />
            </i>
            <p className="text-sm font-semibold">Undo</p>
          </button>
          <button
            onClick={handleRedo}
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
