import {
  FETCH_TASKS,
  CREATE_TASKS,
  UPDATE_TASKS,
  DELETE_TASKS
} from "../types";

export const fetchTasksAction = () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
  return {
    type: FETCH_TASKS,
    payload: storedTasks,
  };
};

export const createTaskAction = (data) => {
  const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
  const updatedTasks = [...existingTasks, data];

  localStorage.setItem("tasks", JSON.stringify(updatedTasks));

  return {
    type: CREATE_TASKS,
    payload: data,
  };
};

export const updateTaskAction = (data) => {
  const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
  const updatedTasks = existingTasks.map((task) =>
    task.id === data.id ? data : task
  );

  localStorage.setItem("tasks", JSON.stringify(updatedTasks));

  return {
    type: UPDATE_TASKS,
    payload: data,
  };
};

export const deleteTaskAction = (taskId) => {
  const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
  const deletedTasks = existingTasks.filter((task) => task.id !== taskId);

  localStorage.setItem("tasks", JSON.stringify(deletedTasks));

  return {
    type: DELETE_TASKS,
    payload: taskId,
  };
};
