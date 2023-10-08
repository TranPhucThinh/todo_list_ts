import React, { useState } from "react";

import AddNewTask from "../components/AddNewTask";
import TaskList from "../components/TaskList";
import TasksCompleted from "../components/TasksCompleted";
import { Task } from "../interface";
import "../styles/myTasksPage.scss";

const MyTasks: React.FC = () => {
  const [dataTask, setDataTask] = useState<Task[]>([]);

  return (
    <div className="myTasks__container">
      <div className="myTasks__header">My Tasks</div>
      <div className="myTasks__content">
        <AddNewTask setDataTask={setDataTask} />
        <TaskList tasksList={dataTask} setDataTask={setDataTask} />
        {dataTask?.find((task) => task?.isCompleted) && (
          <>
            <p
              style={{ padding: "20px 8px 4px", fontSize: 16, fontWeight: 500 }}
            >
              Completed
            </p>
            <TasksCompleted tasksList={dataTask} setDataTask={setDataTask} />
          </>
        )}
      </div>
    </div>
  );
};

export default MyTasks;
