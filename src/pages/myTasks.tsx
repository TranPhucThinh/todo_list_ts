import React from "react";

import AddNewTask from "../components/AddNewTask";
import TaskList from "../components/TaskList";
import "../styles/myTasksPage.scss";

const MyTasks: React.FC = () => {
  return (
    <div className="myTasks__container">
      <div className="myTasks__header">My Tasks</div>
      <div className="myTasks__content">
        <AddNewTask />
        <TaskList />
      </div>
    </div>
  );
};

export default MyTasks;
