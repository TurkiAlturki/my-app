import { PointerEvent, RefObject } from "react";

import { IImage, imageSlice } from "../../../Redux/ImageSlice";
import { ThunkDispatch, UnknownAction, Dispatch } from "@reduxjs/toolkit";
import { IAppSettings } from "../../../Redux/AppSettingsSlice";

const Rectangular = (
  e: PointerEvent<HTMLCanvasElement>,
  canvasRef: RefObject<HTMLCanvasElement>,
  imageUrl: string,
  setReduxState: ThunkDispatch<
    { AppSettingsSlice: IAppSettings; ImageSlice: IImage },
    undefined,
    UnknownAction
  > &
    Dispatch<UnknownAction>,
): void => {
  if (!canvasRef.current) return;
  e.stopPropagation();

  let isDrawing = false;
  let rect = { startX: 0, startY: 0, width: 0, height: 0 };
  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");
  const image = new Image();
  image.src = imageUrl;

  // Draw the image onto the canvas
  const drawImage = () => {
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
  };

  // Initialize drawing start coordinates
  const handleMouseDown = (event: globalThis.PointerEvent) => {
    isDrawing = true;
    const canvasRect = canvas.getBoundingClientRect();
    rect.startX = event.clientX - canvasRect.left;
    rect.startY = event.clientY - canvasRect.top;
  };

  // Update the rectangle dimensions as the pointer moves
  const handleMouseMove = (event: globalThis.PointerEvent) => {
    if (!isDrawing || !context) return;

    const canvasRect = canvas.getBoundingClientRect();
    const currentX = event.clientX - canvasRect.left;
    const currentY = event.clientY - canvasRect.top;

    rect.width = currentX - rect.startX;
    rect.height = currentY - rect.startY;

    // Clear and redraw image, then draw the rectangle
    drawImage();
    context.beginPath();
    context.rect(rect.startX, rect.startY, rect.width, rect.height);
    context.strokeStyle = "red"; // Customize rectangle style if needed
    context.stroke();
  };

  // End drawing and remove event listeners
  const handleMouseUp = () => {
    isDrawing = false;
    document.removeEventListener(
      "pointermove",
      handleMouseMove as EventListener,
    );
    document.removeEventListener("pointerup", handleMouseUp as EventListener);

    // Call the function to copy the selected area to the clipboard

    if (rect.width != 0 && rect.height != 0) {
      setReduxState(imageSlice.setRectClip(rect));
      setReduxState(imageSlice.setSelectSors("Rectangular"));
    }
  };

  // Add event listeners for drawing
  document.addEventListener("pointermove", handleMouseMove as EventListener, {
    passive: false,
  });
  document.addEventListener("pointerup", handleMouseUp as EventListener, {
    passive: false,
  });

  // Start the drawing process
  handleMouseDown(e.nativeEvent);
};

export default Rectangular;
