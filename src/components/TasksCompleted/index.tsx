import React from "react";

import { useTask } from "../../contexts/taskContext";
import TaskItem from "../TaskItem";

const TasksCompleted: React.FC = () => {
  const { state } = useTask();
  const dataTask = state?.tasks;

  const completedTasks = dataTask?.filter((task) => task.isCompleted);

  return (
    <div className="task__list">
      {completedTasks?.map((task, index) => {
        return (
          <div key={index}>
            <TaskItem task={task} />
          </div>
        );
      })}
    </div>
  );
};

export default TasksCompleted;
