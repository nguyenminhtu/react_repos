import { combineReducers } from "redux";

import appReducer from "./App/reducers";

export default function createReducer() {
  const rootReducer = combineReducers({
    app: appReducer
  });

  return rootReducer;
}
