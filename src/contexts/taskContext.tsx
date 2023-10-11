import React, { createContext, useReducer, useContext } from "react";

import { Task } from "../interface";
import { taskReducer } from "../reducers/taskReducers";

export interface initialStateProps {
  tasks: Task[];
}

const initialState: initialStateProps = {
  tasks: [],
};

export type Action =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "ADD_TO_IMPORTANT"; payload: string }
  | { type: "TOGGLE_COMPLETE"; payload: string };

const TaskContext = createContext<
  | {
      state: initialStateProps;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTask must be used within a TodoProvider");
  }
  return context;
};

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
