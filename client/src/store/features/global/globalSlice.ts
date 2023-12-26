import { createSlice } from "@reduxjs/toolkit";

export enum Mode {
  Dark = "dark",
  Light = "light",
}

interface GlobalState {
  mode: Mode;
  userId: string;
}

const initialState: GlobalState = {
  mode: Mode.Dark,
  userId: "63701cc1f03239b7f700000e",
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
