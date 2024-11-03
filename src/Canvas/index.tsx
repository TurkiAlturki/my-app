import CanvasMenu from "./MenuFunctions/CanvasMenu";
import Main from "./Main";
import { Route, Routes } from "react-router-dom";
import CanvasClipboard from "./MenuFunctions/CanvasClipboard";
import CanvasShapes from "./MenuFunctions/CanvasShapes";
import CanvasColors from "./MenuFunctions/CanvasColors";
import CanvasImage from "./MenuFunctions/CanvasImage";
import CanvasTools from "./MenuFunctions/CanvasTools";
function Canvas() {
  return (
    <header className="flex grow flex-col p-2">
      <Routes>
      <Route path="/" element={<div/>} />
      <Route path="/File" element={<CanvasMenu />} />
      <Route path="/Clipboard" element={<CanvasClipboard />} />
      <Route path="/Image" element={<CanvasImage/>} />
      <Route path="/Shapes" element={<CanvasShapes />} />
      <Route path="/Colors" element={<CanvasColors />} />
      <Route path="/Tools" element={<CanvasTools />} />
      </Routes>
      <Main />
    </header>
  );
}

export default Canvas;
