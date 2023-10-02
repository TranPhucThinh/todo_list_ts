import React from "react";

import { Task } from "../../interface";
import TaskItem from "../TaskItem";
import "./taskList.scss";

const tasksList: Task[] = [
  {
    title: "Research content ideas",
    due_date: "22-03-22",
    isImportant: false,
  },
];

const TaskList: React.FC = () => {
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
