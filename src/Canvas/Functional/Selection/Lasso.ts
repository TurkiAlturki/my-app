import { PointerEvent, RefObject } from "react";
import { IImage, imageSlice } from "../../../Redux/ImageSlice";
import { ThunkDispatch, UnknownAction, Dispatch } from "@reduxjs/toolkit";
import { IAppSettings } from "../../../Redux/AppSettingsSlice";

const Lasso = (
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
  let points: { x: number; y: number }[] = [];
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

  // Start the lasso selection
  const handleMouseDown = (event: globalThis.PointerEvent) => {
    isDrawing = true;
    const canvasRect = canvas.getBoundingClientRect();
    points = [
      {
        x: event.clientX - canvasRect.left,
        y: event.clientY - canvasRect.top,
      },
    ];
  };

  // Track points as the user moves the mouse
  const handleMouseMove = (event: globalThis.PointerEvent) => {
    if (!isDrawing || !context) return;

    const canvasRect = canvas.getBoundingClientRect();
    const x = event.clientX - canvasRect.left;
    const y = event.clientY - canvasRect.top;
    points.push({ x, y });

    // Clear and redraw image
    drawImage();

    // Draw the lasso path
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      context.lineTo(points[i].x, points[i].y);
    }
    context.strokeStyle = "blue"; // Customize lasso color as needed
    context.stroke();
  };

  // Finish the lasso selection
  const handleMouseUp = () => {
    if (!context) return;
    isDrawing = false;

    // Complete the shape by connecting the last point to the first
    context.lineTo(points[0].x, points[0].y);
    context.stroke();
    context.closePath();
    setReduxState(imageSlice.setRectClip2(points));
    setReduxState(imageSlice.setSelectSors("Lasso"));

    // Remove event listeners
    document.removeEventListener(
      "pointermove",
      handleMouseMove as EventListener,
    );
    document.removeEventListener("pointerup", handleMouseUp as EventListener);
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

export default Lasso;
