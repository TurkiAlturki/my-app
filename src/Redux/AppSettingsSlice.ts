import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAppSettings {
  uperMenu: string;
}

const initialState: IAppSettings = {
  uperMenu: "Menu_New",
};

export const AppSettingsSlice = createSlice({
  name: "appSettings",
  initialState,
  reducers: {
    setUperMenu: (state, action: PayloadAction<string>) => {
      state.uperMenu = action.payload;
    },
    remove: (state) => {
      state.uperMenu = "";
    },
  },
});

export const appSettingsSlice = AppSettingsSlice.actions;
export default AppSettingsSlice.reducer;
