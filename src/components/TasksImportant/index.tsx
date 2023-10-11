import React from "react";

import { useTask } from "../../contexts/taskContext";
import TaskItem from "../TaskItem";

const TasksImportant: React.FC = () => {
  const { state } = useTask();
  const dataTask = state?.tasks;

  const importantTasks = dataTask?.filter((task) => task.isImportant);

  return (
    <div className="task__list">
      {importantTasks?.map((task, index) => {
        return (
          <div key={index}>
            <TaskItem task={task} />
          </div>
        );
      })}
    </div>
  );
};

export default TasksImportant;
