import React from "react";
import { AiOutlineStar } from "react-icons/ai";

import { useTask } from "../contexts/taskContext";
import "../styles/importantTasks.scss";
import TasksImportant from "../components/TasksImportant";

const Important: React.FC = () => {
  const { state } = useTask();
  const dataTask = state?.tasks;
  console.log("dataTask:", dataTask);

  return (
    <div className="importantTasks__container">
      <div className="importantTasks__header">
        <span className="importantTasks__header--icon">
          <AiOutlineStar />
        </span>
        Important
      </div>
      <div className="importantTasks__content">
        <TasksImportant />
      </div>
    </div>
  );
};

export default Important;
