// tasksReducer.js

import {
  FETCH_TASKS,
  CREATE_TASKS,
  UPDATE_TASKS,
  DELETE_TASKS
} from "../types";

const initialState = {
  tasks: [],
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };

    case CREATE_TASKS:
      const newData = [...state.tasks, action.payload];

      return {
        ...state,
        tasks: newData,
      };

    case UPDATE_TASKS:
      const updatedData = state.tasks.map((task, index) =>
        index === parseInt(action.payload.id) ? action.payload.data : task
      );

      return {
        ...state,
        tasks: updatedData,
      };

    case DELETE_TASKS:
      const filteredTasks = state.tasks.filter(task => task.name !== action.payload);

      return {
        ...state,
        tasks: filteredTasks,
      };

    default:
      return state;
  }
};