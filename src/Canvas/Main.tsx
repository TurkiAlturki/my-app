import { GetReduxState, SetReduxState } from "../Redux/Store";
import { useRef } from "react";

import { LuChevronLeftCircle, LuChevronRightCircle } from "react-icons/lu";
import { imageSlice } from "../Redux/ImageSlice";
function Main() {
  const setReduxState = SetReduxState();
  const uperMenu = GetReduxState((state) => state.AppSettingsSlice.uperMenu);
  const imageUrl = GetReduxState((state) => state.ImageSlice.imageUrl);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (imageUrl) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-gray-300">
        <canvas className="h-full w-full " ref={canvasRef} />
        <div className="absolute bottom-1 right-2 flex gap-1">
          <button
            onClick={() => console.log("undo")}
            className=" flex flex-col items-center justify-center rounded bg-gray-300 p-1 hover:bg-blue-500 hover:text-gray-200"
          >
            <i className=" text-3xl">
              <LuChevronLeftCircle />
            </i>
            <p className=" text-sm font-semibold">Undo</p>
          </button>
          <button
            onClick={() => console.log("redo")}
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
