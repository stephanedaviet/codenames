import { createSlice } from "@reduxjs/toolkit";

const turnSlice = createSlice({
  name: "turn",
  initialState: {
    team: "A",
    stage: "hint",
  },
  reducers: {
    nextTurn(state, { hint, number }) {
      if (state.stage == "hint") {
        return { ...state, stage: "guess" };
      } else {
        if (state.team == "A") {
          return { team: "B", stage: "hint" };
        } else {
          return { team: "A", stage: "hint" };
        }
      }
    },
  },
});

export const { nextTurn } = turnSlice.actions;

export default turnSlice.reducer;
