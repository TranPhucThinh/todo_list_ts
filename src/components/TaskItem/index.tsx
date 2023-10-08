import React, { useState, useEffect } from "react";
import { HiStar, HiOutlineChevronRight, HiOutlineStar } from "react-icons/hi";
import { IoCalendarOutline } from "react-icons/io5";
import { GoCircle, GoCheckCircleFill } from "react-icons/go";
import { Tooltip } from "react-tooltip";

import { Task } from "../../interface";
import "./taskItem.scss";
import moment from "moment";
import { DATE_FORMAT } from "../../utils/variables";

interface TaskItemProps {
  task: Task;
  tasksList?: Task[];
  setDataTask: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  tasksList,
  setDataTask,
}) => {
  const [important, setImportant] = useState<boolean>(false);
  const [isDueDate, setIsDueDate] = useState<boolean>(true);

  const checkImportantHandler = () => {
    setImportant(!important);
  };

  const checkDueDateTask = () => {
    if (task?.due_date) {
      const today = moment().format(DATE_FORMAT.DAY_MONTH_FULL);
      const dueDate = moment(task?.due_date);
      if (dueDate.isSameOrAfter(today, "day")) {
        setIsDueDate(true);
      } else {
        setIsDueDate(false);
      }
    }
  };

  useEffect(() => {
    checkDueDateTask();
  }, [task]);

  const checkCompleteHandler = (id: string) => {
    const updatedTasks = (tasksList ?? []).map((task) => {
      if (task?.id === id) {
        return { ...task, isCompleted: !task?.isCompleted };
      }
      return task;
    });

    setDataTask(updatedTasks);
  };

  return (
    <div className="task">
      <div className="task__checkbox-title">
        <div
          onClick={() => checkCompleteHandler(task?.id)}
          style={{ color: "#2564cf" }}
          className="task__checkbox--complete"
        >
          {task?.isCompleted ? <GoCheckCircleFill /> : <GoCircle />}
        </div>
        <div>
          <p
            className={`task__title ${
              task?.isCompleted ? "task__completed" : ""
            } `}
          >
            {task?.title}
          </p>
          <div className="task__due-date">
            <span className="task__due--dot">Tasks</span>
            {task?.due_date && (
              <>
                <div
                  style={isDueDate ? {} : { color: "#a80000" }}
                  className="task__due-date--icon"
                >
                  <IoCalendarOutline />
                </div>
                <span
                  style={isDueDate ? {} : { color: "#a80000" }}
                  className="task__due-date--detail"
                >{`${isDueDate ? "Due" : "Overdue"} ${task?.due_date}`}</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="task__important-showDetails">
        <div
          data-tooltip-id="important-tooltip"
          className="task__important--icon"
          onClick={checkImportantHandler}
        >
          {important ? <HiStar /> : <HiOutlineStar />}
        </div>
        <Tooltip id="important-tooltip" place="top" content="Add new task" />
        <div className="task__showDetails--icon">
          <HiOutlineChevronRight />
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
