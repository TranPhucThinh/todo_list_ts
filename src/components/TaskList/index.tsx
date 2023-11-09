import React from "react";

import { useTask } from "../../contexts/taskContext";
import TaskItem from "../TaskItem";
import "./taskList.scss";

const TaskList: React.FC = () => {
  const { state } = useTask();

  const dataTasks = state.tasks;

  const taskInCompleted = dataTasks?.filter((task) => !task?.isCompleted);

  return (
    <div className="task__list">
      {taskInCompleted?.map((task, index) => {
        return (
          <div key={index}>
            <TaskItem task={task} />
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
