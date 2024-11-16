import { createSlice, PayloadAction } from "@reduxjs/toolkit";




export interface IImage {
  imageUrl: string | null;
  imageWidth: number | null;
}

const initialState: IImage = {
  imageUrl: null,
  imageWidth: null,
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
  },
});

export const imageSlice = ImageSlice.actions;
export default ImageSlice.reducer;
