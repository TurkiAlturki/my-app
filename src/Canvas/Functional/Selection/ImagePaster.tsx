import React, { useRef, useEffect } from "react";

const ImagePaster: React.FC = () => {
  const pasteCanvasRef = useRef<HTMLCanvasElement>(null);

  // Function to handle pasting from clipboard
  const handlePaste = async (e: ClipboardEvent) => {
    e.preventDefault();

    if (!pasteCanvasRef.current) return;
    const canvas = pasteCanvasRef.current;
    const context = canvas.getContext("2d");

    try {
      // Check if clipboard has image data
      const clipboardItems = await navigator.clipboard.read();
      for (const item of clipboardItems) {
        for (const type of item.types) {
          if (type.startsWith("image/")) {
            const blob = await item.getType(type);

            // Create an Image element to load and draw the blob onto the canvas
            const img = new Image();
            img.src = URL.createObjectURL(blob);

            img.onload = () => {
              if (context) {
                // Clear the canvas and draw the pasted image
                canvas.width = img.width;
                canvas.height = img.height;
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, 0, 0, img.width, img.height);
                URL.revokeObjectURL(img.src); // Clean up object URL
              }
            };
            return; // Stop once an image is found and pasted
          }
        }
      }
    } catch (error) {
      console.error("Error accessing clipboard contents:", error);
    }
  };

  useEffect(() => {
    // Listen for paste events on the document
    document.addEventListener("paste", handlePaste as unknown as EventListener);
    return () => {
      document.removeEventListener("paste", handlePaste as unknown as EventListener);
    };
  }, []);

  return (
    <div>
      <p>Press Ctrl+V to paste the image here:</p>
      <canvas ref={pasteCanvasRef} style={{ border: "1px solid black" }} />
    </div>
  );
};

export default ImagePaster;
