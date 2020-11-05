import {
  ADD_TASKS,
  DELETE_TASK,
  EDIT_TASK,
  DONE_TASK,
  CHANGE_TEXT
} from "../actions";

const initialState = {};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASKS:
      return {
        ...state,
        [action.id]: {
          id: action.id,
          text: action.text,
          isEdit: false,
          createdAt: action.createdAt
        }
      };
    case DELETE_TASK:
      delete state[action.id];
      return {
        ...state
      };
    case EDIT_TASK:
      const editTask = state[action.id];
      return {
        ...state,
        [action.id]: {
          ...editTask,
          isEdit: !action.isEdit
        }
      };
    case DONE_TASK:
      const doneTask = state[action.id];
      return {
        ...state,
        [action.id]: {
          ...doneTask,
          isDone: !action.isDone
        }
      };
    case CHANGE_TEXT:
      const textChangeTask = state[action.id];
      return {
        ...state,
        [action.id]: {
          ...textChangeTask,
          text: action.editText,
          createdAt: action.editAt,
          isEdit: false
        }
      };
    default:
      return state;
  }
};

export default todos;
