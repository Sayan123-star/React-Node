import { createStore } from "redux";
import { combileReducer } from "./combineReducer";
// Combining the reducers and storing the action
export const store = createStore(
    combileReducer
);