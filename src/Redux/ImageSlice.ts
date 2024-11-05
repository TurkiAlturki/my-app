import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IImage {
  imageUrl: string | null;
}

const initialState: IImage = {
  imageUrl: null,
};

export const ImageSlice = createSlice({
  name: "imageSlice",
  initialState,
  reducers: {
    setImageUrl: (state, action: PayloadAction<string>) => {
      state.imageUrl = action.payload;
    },

    remove: (state) => {
      state.imageUrl = null;
    },
  },
});

export const imageSlice = ImageSlice.actions;
export default ImageSlice.reducer;
