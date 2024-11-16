import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IImage {
  imageUrl: string | null;
  imageWidth: number | null;
  undoStack: string[];
  redoStack: string[];
}

const initialState: IImage = {
  imageUrl: null,
  imageWidth: null,
  undoStack: [],
  redoStack: [],
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

    clearImageUrl: (state) => {
      state.imageUrl = null;
    },

    saveState: (state, action: PayloadAction<any>) => {
      // Add the new state to undoStack and clear redoStack
      if (state.undoStack[state.undoStack.length - 1] !== action.payload) {
        state.undoStack.push(action.payload);
        state.redoStack = []; // Clear redoStack on new save
      }
    },
    undo: (state) => {
      if (state.undoStack.length > 1) {
        const currentState = state.undoStack.pop();
        if (currentState) {
          state.redoStack.push(currentState); // Move current state to redoStack
        }
      }
    },
    redo: (state) => {
      if (state.redoStack.length > 0) {
        const nextState = state.redoStack.pop();
        if (nextState) {
          state.undoStack.push(nextState); // Move next state to undoStack
        }
      }
    },
    clearHistory: (state) => {
      state.undoStack = [];
      state.redoStack = [];
    },
  },
});

export const imageSlice = ImageSlice.actions;
export default ImageSlice.reducer;
