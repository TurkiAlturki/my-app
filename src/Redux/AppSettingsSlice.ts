import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAppSettings {
  sideMenu: string;
  uperMenu: string;
}

const initialState: IAppSettings = {
  sideMenu: "",
  uperMenu: "",
};

export const AppSettingsSlice = createSlice({
  name: "appSettings",
  initialState,
  reducers: {
    setSideMenu: (state, action: PayloadAction<string>) => {
      state.sideMenu = action.payload;
    },
    setUperMenu: (state, action: PayloadAction<string>) => {
      state.uperMenu = action.payload;
    },
    remove: (state) => {
      state.sideMenu = "";
      state.uperMenu = "";
    },
  },
});

export const appSettingsSlice = AppSettingsSlice.actions;
export default AppSettingsSlice.reducer;
