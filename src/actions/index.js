export const ADD_TASKS = "ADD_TASKS";
export const DELETE_TASK = "DELETE_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const DONE_TASK = "DONE_TASK";
export const CHANGE_TEXT = "CHANGE_TEXT";

let id = 1;
export const addTasks = (text, createdAt) => {
  return {
    type: ADD_TASKS,
    id: id++,
    text,
    createdAt
  };
};

export const deleteTask = (id) => {
  return {
    type: DELETE_TASK,
    id
  };
};

export const editTask = (id, isEdit) => {
  return {
    type: EDIT_TASK,
    id,
    isEdit
  };
};

export const doneTask = (id, isDone) => {
  return {
    type: DONE_TASK,
    id,
    isDone
  };
};

export const changeText = (id, editText, editAt) => {
  return {
    type: CHANGE_TEXT,
    editText,
    id,
    editAt
  };
};
