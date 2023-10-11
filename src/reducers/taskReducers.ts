import { Action, initialStateProps } from "../contexts/taskContext";

export const taskReducer = (
  state: initialStateProps,
  action: Action,
): initialStateProps => {
  switch (action.type) {
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

    default:
      return state;
  }
};
