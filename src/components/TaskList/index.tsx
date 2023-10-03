import React from "react";

import { Task } from "../../interface";
import TaskItem from "../TaskItem";
import "./taskList.scss";

interface TaskListProps {
  tasksList?: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasksList }) => {
  return (
    <div className="task__list">
      {tasksList?.map((task, index) => {
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
