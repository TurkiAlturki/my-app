import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAppSettings {
  sideMenu: number | null;
  uperMenu: string | null;
}

const initialState: IAppSettings = {
  sideMenu: null,
  uperMenu: null,
};

export const AppSettingsSlice = createSlice({
  name: "appSettings",
  initialState,
  reducers: {
    setSideMenu: (state, action: PayloadAction<number>) => {
      state.sideMenu = action.payload;
    },
    setUperMenu: (state, action: PayloadAction<string>) => {
      state.uperMenu = action.payload;
    },
    remove: (state) => {
      state.sideMenu = null;
      state.uperMenu = null;
    },
  },
});

export const appSettingsSlice = AppSettingsSlice.actions;
export default AppSettingsSlice.reducer;
