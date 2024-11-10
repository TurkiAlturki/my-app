import React, { useRef, useState } from "react";

function Maintemp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [history, setHistory] = useState<string[]>([]); // Stores history of canvas states
  const [undoHistory, setUndoHistory] = useState<string[]>([]); // Stores history for redo

  // Function to save current canvas state to history
  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL(); // Capture canvas as image URL
      setHistory((prev) => [...prev, dataURL]);
    }
  };
  console.log(history);
  console.log(undoHistory);
  // Function to undo the last action
  const undo = () => {
    if (history.length > 0) {
      setUndoHistory((prev) => [...prev, history[history.length - 1]]); // Save current state for redo
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);

      const previousState = newHistory[newHistory.length - 1]; // Get the last saved state
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (canvas && ctx && previousState) {
        const img = new Image();
        img.src = previousState;
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
          ctx.drawImage(img, 0, 0); // Draw the last saved state
        };
      }
    }
  };

  // Example drawing function (this will trigger saveCanvasState)
  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      if (history.length % 2 == 0) {
        ctx.fillStyle = "red";
      }else{
        ctx.fillStyle = "black";
      }

      ctx.fillRect(10, 10, 100, 100);
      saveCanvasState(); // Save state after drawing
    }
  };

  return (
    <div className="absolute bottom-0 right-0">
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        style={{ border: "1px solid black" }}
      />
      <button onClick={draw} className="bg-red-900">
        Draw
      </button>
      <button onClick={undo} disabled={history.length === 0}>
        Undo
      </button>
    </div>
  );
}

export default Maintemp;
