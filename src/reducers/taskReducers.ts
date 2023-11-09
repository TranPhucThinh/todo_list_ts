import { Action, initialStateProps } from "../contexts/taskContext";

export const taskReducer = (
  state: initialStateProps,
  action: Action,
): initialStateProps => {
  switch (action.type) {
    case "GET_ALL_TASKS":
      return { ...state, tasks: action.payload };

    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };

    case "TOGGLE_COMPLETE":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, isCompleted: !task.isCompleted }
            : task,
        ),
      };

    case "ADD_TO_IMPORTANT":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, isImportant: !task.isImportant }
            : task,
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case "TOGGLE_DETAILS_TASK":
      return {
        ...state,
        taskDetails: action.payload.taskDetails,
        isOpenDetailsTask: action.payload.isOpenDetailsTask,
      };

    case "TOGGLE_MODAL_DELETE":
      return {
        ...state,
        isOpenModalDelete: action.payload,
      };

    case "UPDATE_DETAILS_TASK":
      return {
        ...state,
        taskDetails: action.payload,
      };

    default:
      return state;
  }
};
