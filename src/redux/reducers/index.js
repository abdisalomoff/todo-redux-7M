import { combineReducers } from "redux";
import { tasksReducer } from "./tasksReducer";

const reducers = combineReducers({
  data: tasksReducer,
});

export default reducers;
