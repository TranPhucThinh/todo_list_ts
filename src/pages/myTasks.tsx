import moment from "moment";
import React, { useState } from "react";
import { BiTask } from "react-icons/bi";
import { BsChevronUp } from "react-icons/bs";

import AddNewTask from "../components/AddNewTask";
import TaskList from "../components/TaskList";
import TasksCompleted from "../components/TasksCompleted";
import { useTask } from "../contexts/taskContext";
import "../styles/myTasksPage.scss";
import { DATE_FORMAT } from "../utils/variables";

const MyTasks: React.FC = () => {
  const { state } = useTask();
  const dataTask = state?.tasks;

  const [isOpenCollapse, setIsOpenCollapse] = useState<boolean>(false);

  const openCollapseHandler = () => {
    setIsOpenCollapse(!isOpenCollapse);
  };

  return (
    <div className="myTasks__container">
      <div className="myTasks__header">
        <span className="myTasks__header--icon">
          <BiTask />
        </span>
        My Tasks
      </div>
      <p className="myTasks__today">
        {moment().format(DATE_FORMAT.DAY_MONTH_FULL)}
      </p>
      <div className="myTasks__content">
        <AddNewTask />
        <TaskList />
        {dataTask?.find((task) => task?.isCompleted) && (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 16,
                marginLeft: 8,
                gap: 8,
                cursor: "pointer",
              }}
              onClick={openCollapseHandler}
            >
              <div
                className={`collapsed-icon ${
                  isOpenCollapse ? "expanded" : "collapsed"
                }`}
              >
                <BsChevronUp />
              </div>
              <span
                style={{
                  marginLeft: 4,
                  fontSize: 15,
                  fontWeight: 500,
                  display: "inline-block",
                }}
              >
                Completed
              </span>
              <span
                style={{
                  marginLeft: 4,
                  fontSize: 14,
                  fontWeight: 400,
                  display: "inline-block",
                }}
              >
                {dataTask?.map((task) => task?.isCompleted)?.length}
              </span>
            </div>
            {isOpenCollapse && (
              <div className="tasks__completed--wrapper">
                <TasksCompleted />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyTasks;
