import { PointerEvent, RefObject } from "react";

export const handleMoving = (
  e: PointerEvent<HTMLCanvasElement>,
  canvasRef: RefObject<HTMLCanvasElement>,
  bgRef: RefObject<HTMLDivElement>,
  imageWidth: number | null,
): void => {
  if ( !canvasRef.current || !bgRef.current) return;

  e.stopPropagation();
  const clientX = e.clientX;
  const clientY = e.clientY;
  const canvasRect = canvasRef.current.getBoundingClientRect();
  const bgRect = bgRef.current.getBoundingClientRect();

  const moveHandler = (event: globalThis.PointerEvent) => {
    const newLeft = event.clientX - clientX + canvasRect.x - bgRect.x;
    const newTop = event.clientY - clientY + canvasRect.y - bgRect.y;

    // Constrain movement within background boundaries
    const constrainedLeft = Math.min(
      Math.max(newLeft, 0),
      bgRect.width - canvasRect.width,
    );
    const constrainedTop = Math.min(
      Math.max(newTop, 0),
      bgRect.height - canvasRect.height,
    );

    requestAnimationFrame(() => {
      canvasRef.current!!.style.left = `${constrainedLeft}px`;
      canvasRef.current!!.style.top = `${constrainedTop}px`;
    });
  };

  const upHandler = () =>
    handlePointerUP(upHandler, moveHandler);

  document.addEventListener("pointermove", moveHandler as EventListener, {
    passive: false,
  });
  document.addEventListener("pointerup", upHandler as EventListener, {
    passive: false,
  });
};

const handlePointerUP = (
  upHandler: (e: globalThis.PointerEvent) => void,
  moveHandler: (e: globalThis.PointerEvent) => void,
) => {
  document.removeEventListener("pointermove", moveHandler as EventListener);
  document.removeEventListener("pointerup", upHandler as EventListener);
};
