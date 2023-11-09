import React, { createContext, useReducer, useContext } from "react";

import { Task } from "../interface";
import { taskReducer } from "../reducers/taskReducers";

export interface initialStateProps {
  tasks: Task[];
  taskDetails: Task;
  isOpenDetailsTask: boolean;
  isOpenModalDelete: boolean;
  optionDue: string;
}

const initialState: initialStateProps = {
  tasks: [],
  taskDetails: { id: "", title: "string", isCompleted: false },
  isOpenDetailsTask: false,
  isOpenModalDelete: false,
  optionDue: "",
};

export type Action =
  | { type: "GET_ALL_TASKS"; payload: Task[] }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "ADD_TO_IMPORTANT"; payload: string }
  | { type: "TOGGLE_COMPLETE"; payload: string }
  | {
      type: "TOGGLE_DETAILS_TASK";
      payload: { taskDetails: Task; isOpenDetailsTask: boolean };
    }
  | { type: "TOGGLE_MODAL_DELETE"; payload: boolean }
  | { type: "UPDATE_DETAILS_TASK"; payload: Task };

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
