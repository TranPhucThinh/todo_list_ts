import axios from "axios";
import React, { useEffect } from "react";
import { AiOutlineStar } from "react-icons/ai";

import TasksImportant from "../components/TasksImportant";
import { useTask } from "../contexts/taskContext";
import "../styles/importantTasks.scss";

const Important: React.FC = () => {
  const { state, dispatch } = useTask();
  const dataTask = state?.tasks;

  const importantTasks = dataTask?.filter((task) => task.isImportant);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3004/tasks");

      dispatch({ type: "GET_ALL_TASKS", payload: response?.data });
    };

    fetchData();
  }, []);

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
      {importantTasks?.length <= 0 && (
        <p className="important__tasks--empty">Empty</p>
      )}
    </div>
  );
};

export default Important;
