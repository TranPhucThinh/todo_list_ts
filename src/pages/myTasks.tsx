import React, { useState } from "react";

import AddNewTask from "../components/AddNewTask";
import TaskList from "../components/TaskList";
import "../styles/myTasksPage.scss";
import { Task } from "../interface";

const MyTasks: React.FC = () => {
  const [dataTask, setDataTask] = useState<Task[]>();

  return (
    <div className="myTasks__container">
      <div className="myTasks__header">My Tasks</div>
      <div className="myTasks__content">
        <AddNewTask setDataTask={setDataTask} />
        <TaskList tasksList={dataTask} />
      </div>
    </div>
  );
};

export default MyTasks;
