import * as fabric from "fabric";
import { RefObject } from "react";
import { IImage, imageSlice } from "../../Redux/ImageSlice";
import { ThunkDispatch, UnknownAction, Dispatch } from "@reduxjs/toolkit";
import { IAppSettings } from "../../Redux/AppSettingsSlice";
const initialize = (
  canvasRef: RefObject<HTMLCanvasElement>,
  refContainer: RefObject<HTMLDivElement>,
  fabricCanvasRef: any,
  imageUrl: RequestInfo | URL | null,
  setReduxState: ThunkDispatch<
    { AppSettingsSlice: IAppSettings; ImageSlice: IImage },
    undefined,
    UnknownAction
  > &
    Dispatch<UnknownAction>,
) => {
  if (canvasRef.current && refContainer.current) {
    const container = refContainer.current.getBoundingClientRect();
    canvasRef.current.width = container.width;
    canvasRef.current.height = container.height;

    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.dispose();
      fabricCanvasRef.current = null; // Clear the reference
    }

    
    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current);

    if (imageUrl && fabricCanvasRef.current) {
      const loadImage = async () => {
        try {
          // Fetch the image as a Blob
          const response = await fetch(imageUrl, { mode: "cors" });
          const blob = await response.blob();


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
     
    
        } catch (error) {
          console.error("Error loading image:", error);
        }
      };

      loadImage();
    }

    // Add listeners
    fabricCanvasRef.current.on("object:added", () =>
      saveCanvasState(fabricCanvasRef, setReduxState),
    );
    fabricCanvasRef.current.on("object:modified", () =>
      saveCanvasState(fabricCanvasRef, setReduxState),
    );
    fabricCanvasRef.current.on("object:removed", () =>
      saveCanvasState(fabricCanvasRef, setReduxState),
    );
  }

  // Cleanup
  return () => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.off("object:added");
      fabricCanvasRef.current.off("object:modified");
      fabricCanvasRef.current.off("object:removed");
      fabricCanvasRef.current.dispose();
    }
  };
};

const saveCanvasState = (
  fabricCanvasRef: React.MutableRefObject<fabric.Canvas | null>,
  setReduxState: ThunkDispatch<
    { AppSettingsSlice: IAppSettings; ImageSlice: IImage },
    undefined,
    UnknownAction
  > &
    Dispatch<UnknownAction>,
) => {
  if (fabricCanvasRef.current) {
    const canvasJson = fabricCanvasRef.current.toJSON();
    setReduxState(imageSlice.saveState(canvasJson));
  }
};

export default initialize;
