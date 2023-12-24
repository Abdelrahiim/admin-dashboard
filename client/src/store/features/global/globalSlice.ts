import { createSlice } from "@reduxjs/toolkit";

export enum Mode {
  Dark = "dark",
  Light = "light",
}

interface GlobalState {
  mode: Mode;
}

const initialState: GlobalState = {
  mode: Mode.Dark,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === Mode.Light ? Mode.Dark : Mode.Light;
    },
  },
});

export const { setMode } = globalSlice.actions;
export default globalSlice.reducer;
