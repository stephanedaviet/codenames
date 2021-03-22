import { combineReducers } from "redux";

import board from "./board";
import turn from "./turn";

const rootReducer = combineReducers({
  board,
  turn,
});

export default rootReducer;
