import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import AppSettingsSlice from "./AppSettingsSlice";
import ImageSlice from "./ImageSlice";

const store = configureStore({
  reducer: {
    AppSettingsSlice,
    ImageSlice,
  },
});

export type ReduxState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const SetReduxState = () => useDispatch<AppDispatch>();
export const GetReduxState: TypedUseSelectorHook<ReduxState> = useSelector;

export default store;
