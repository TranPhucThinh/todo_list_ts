import axios from "axios";
import React, { useEffect, useState } from "react";
import { GoCheckCircleFill, GoCircle } from "react-icons/go";
import { HiOutlineChevronRight, HiOutlineStar, HiStar } from "react-icons/hi";
import { IoCalendarOutline } from "react-icons/io5";
import { Tooltip } from "react-tooltip";

import moment from "moment";
import { useTask } from "../../contexts/taskContext";
import { Task } from "../../interface";
import { convertFullDateToDate } from "../../utils/Helpers";
import { DATE_FORMAT } from "../../utils/variables";
import "./taskItem.scss";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { dispatch } = useTask();

  const [isDueDate, setIsDueDate] = useState<boolean>(true);

  const checkImportantHandler = (id: string) => {
    axios.put("http://localhost:3004/tasks/" + id, {
      ...task,
      isImportant: !task.isImportant,
    });
    dispatch({ type: "ADD_TO_IMPORTANT", payload: id });
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
    axios.put("http://localhost:3004/tasks/" + id, {
      ...task,
      isCompleted: !task.isCompleted,
    });
    dispatch({ type: "TOGGLE_COMPLETE", payload: id });
  };

  const openDetailsTaskHandler = () => {
    dispatch({
      type: "TOGGLE_DETAILS_TASK",
      payload: { taskDetails: task, isOpenDetailsTask: true },
    });
  };

  return (
    <div className="task" onClick={openDetailsTaskHandler}>
      <div className="task__checkbox-title">
        <div
          onClick={(e) => {
            e.stopPropagation();
            checkCompleteHandler(task?.id);
          }}
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
                >{`${isDueDate ? "Due" : "Overdue"} ${convertFullDateToDate(
                  task?.due_date,
                )}`}</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="task__important-showDetails">
        {!task?.isCompleted && (
          <>
            <div
              data-tooltip-id="important-tooltip"
              className="task__important--icon"
              onClick={() => checkImportantHandler(task?.id)}
            >
              {task?.isImportant ? <HiStar /> : <HiOutlineStar />}
            </div>
            <Tooltip
              id="important-tooltip"
              place="top"
              content="Add important task"
            />
          </>
        )}
        <div className="task__showDetails--icon">
          <HiOutlineChevronRight />
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
