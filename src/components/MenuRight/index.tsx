import React, { useState, ChangeEvent } from "react";
import {
  GoCheckCircleFill,
  GoCircle,
  GoTrash,
  GoSidebarCollapse,
} from "react-icons/go";
import { HiOutlineStar, HiStar, HiPlus } from "react-icons/hi";
import { Tooltip } from "react-tooltip";

import { useTask } from "../../contexts/taskContext";
import { Task } from "../../interface";
import "./menuRight.scss";

const MenuRight: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(true);
  const { dispatch } = useTask();

  const [inputStep, setInputStep] = useState<string>("");

  const task: Task = {
    id: "dasdaksd",
    title: "ok2",
    due_date: "Today",
    isImportant: false,
    isCompleted: false,
  };

  const onAddNewTaskStepHandler = () => {};

  const checkCompleteHandler = (id: string) => {
    dispatch({ type: "TOGGLE_COMPLETE", payload: id });
  };

  const checkImportantHandler = (id: string) => {
    dispatch({ type: "ADD_TO_IMPORTANT", payload: id });
  };

  const onChangeInputStepHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputStep(e.target.value);
  };

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onAddNewTaskStepHandler();
    }
  };

  return (
    <div className={openMenu ? "menu__right--open" : "menu__right--close"}>
      <div className="menu__right--content">
        <div className="menu__right--info-task">
          <div className="description__task">
            <div className="task__checkbox-title">
              <div
                onClick={() => checkCompleteHandler(task?.id)}
                style={{ color: "#2564cf" }}
                className="task__checkbox--complete"
              >
                {task?.isCompleted ? <GoCheckCircleFill /> : <GoCircle />}
              </div>
              <p
                className={`task__title ${
                  task?.isCompleted ? "task__completed" : ""
                } `}
              >
                {task?.title}
              </p>
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
            </div>
          </div>
          <div className="add__step">
            <div
              data-tooltip-id="add__step-tooltip"
              className={`add__step--icon ${
                inputStep !== "" ? "" : "disabled__btn"
              }`}
              onClick={onAddNewTaskStepHandler}
            >
              <HiPlus />
            </div>
            <Tooltip id="add__step-tooltip" place="top" content="Add Step" />
            <input
              type="text"
              placeholder="Add Step"
              className="add__step--input"
              onChange={onChangeInputStepHandler}
              value={inputStep}
              onKeyDown={onKeyDownHandler}
            />
          </div>
        </div>
      </div>
      <div className="menu__right--option">
        <div className="option__icon">
          <GoSidebarCollapse />
        </div>
        <div className="option__icon">
          <GoTrash />
        </div>
      </div>
    </div>
  );
};

export default MenuRight;
