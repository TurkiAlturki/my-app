import CanvasMenu from "./MenuFunctions/CanvasMenu";
import Main from "./Main";
import { Route, Routes } from "react-router-dom";
import CanvasClipboard from "./MenuFunctions/CanvasClipboard";
import CanvasShapes from "./MenuFunctions/CanvasShapes";
import CanvasColors from "./MenuFunctions/CanvasColors";
import CanvasTools from "./MenuFunctions/CanvasTools";
import ImageUploader from "./hjelper/ImageUploader";
import { GetReduxState } from "../Redux/Store";
function Canvas() {
  const uperMenu = GetReduxState((state) => state.AppSettingsSlice.uperMenu);
  return (
    <div className="flex w-full h-full flex-col">
      <Routes>
        <Route path="/" element={<div />} />
        <Route path="/File" element={uperMenu === "Menu_New"? <ImageUploader />: <CanvasMenu />} />
        <Route path="/Clipboard" element={<CanvasClipboard />} />
        <Route path="/Shapes" element={<CanvasShapes />} />
        <Route path="/Colors" element={<CanvasColors />} />
        <Route path="/Tools" element={<CanvasTools />} />
      </Routes>
      <Main />
    </div>
  );
}

export default Canvas;