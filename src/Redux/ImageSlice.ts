import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IRectClip {
  height: number;
  startX: number;
  startY: number;
  width: number;
}
export interface IRectClip2 {
  x: number;
  y: number;
}

export interface IImage {
  imageUrl: string | null;
  imageWidth: number | null;
  rectClip: IRectClip;
  rectClip2: IRectClip2[];
  selectSors: string;
  undo: string[];
  redo: string[];
}

const initialState: IImage = {
  imageUrl: null,
  imageWidth: null,
  rectClip: { startX: 0, startY: 0, width: 0, height: 0 },
  rectClip2: [{ x: 0, y: 0 }],
  selectSors: "",
  undo: [],
  redo: [],
};

export const ImageSlice = createSlice({
  name: "imageSlice",
  initialState,
  reducers: {
    setImageUrl: (state, action: PayloadAction<string>) => {
      state.imageUrl = action.payload;
    },
    setImageWidth: (state, action: PayloadAction<number>) => {
      state.imageWidth = action.payload;
    },
    setRectClip: (state, action: PayloadAction<IRectClip>) => {
      state.rectClip = action.payload;
    },
    setRectClip2: (state, action: PayloadAction<IRectClip2[]>) => {
      state.rectClip2 = action.payload;
    },
    setSelectSors: (state, action: PayloadAction<string>) => {
      state.selectSors = action.payload;
    },
    setUndo: (state, action: PayloadAction<string>) => {
      state.undo.push(action.payload);
      if (state.undo.length > 50) state.undo.shift(); // limit undo history
    },
    undo: (state) => {
      if (state.undo.length > 0) {
        const lastAction = state.undo.pop(); // Remove the last action from undo
        if (lastAction) {
          state.redo.push(lastAction); // Add it to redo
          if (state.redo.length > 50) state.redo.shift(); // limit redo history
        }
      }
    },
    setRedo: (state, action: PayloadAction<string>) => {
      state.redo.push(action.payload);
      if (state.redo.length > 50) state.redo.shift(); // limit redo history
    },
    redo: (state) => {
      if (state.redo.length > 0) {
        const lastRedoAction = state.redo.pop(); // Remove the last action from redo
        if (lastRedoAction) {
          state.undo.push(lastRedoAction); // Add it to undo
          if (state.undo.length > 50) state.undo.shift(); // limit undo history
        }
      }
    },
    clearRedo: (state) => {
      state.redo = [];
    },
    clearUndo: (state) => {
      state.undo = [];
    },
    clearImageUrl: (state) => {
      state.imageUrl = null;
    },
  },
});

export const imageSlice = ImageSlice.actions;
export default ImageSlice.reducer;
