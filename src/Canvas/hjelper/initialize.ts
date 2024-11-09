import { ThunkDispatch, UnknownAction, Dispatch } from "@reduxjs/toolkit";
import { IAppSettings } from "../../Redux/AppSettingsSlice";
import { IImage, imageSlice } from "../../Redux/ImageSlice";

import { RefObject } from "react";

const initialize = (
  canvasRef: RefObject<HTMLCanvasElement>,
  imageUrl: string | null,
  setReduxState: ThunkDispatch<
    { AppSettingsSlice: IAppSettings; ImageSlice: IImage },
    undefined,
    UnknownAction
  > &
    Dispatch<UnknownAction>,
) => {
  if (canvasRef.current) {
    const canvas = canvasRef.current;
    setReduxState(
      imageSlice.setImageWidth(canvas.getBoundingClientRect().width),
    );

    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.src = imageUrl || ""; // Ensures imageUrl is not undefined
    img.onload = () => {
      // Resize the canvas to fit the image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image on the canvas
      ctx?.drawImage(img, 0, 0, img.width, img.height);
    };
  }
};

export default initialize;
