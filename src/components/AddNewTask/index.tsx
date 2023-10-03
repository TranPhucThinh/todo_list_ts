import React, { ChangeEvent, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { IoCalendarOutline } from "react-icons/io5";
import { Tooltip } from "react-tooltip";
import { v4 as uuidv4 } from "uuid";

import { Task } from "../../interface";
import DropdownSetDue from "../DropdownSetDue";
import "./addNewTask.scss";
import { checkTypeDueDate } from "../../utils/Helpers";

interface AddNewTaskProps {
  setDataTask: React.Dispatch<React.SetStateAction<Task[] | undefined>>;
}

const AddNewTask: React.FC<AddNewTaskProps> = ({ setDataTask }) => {
  const [showDropdownDue, setShowDropdownDue] = useState<boolean>(false);
  const [inputTask, setInputTask] = useState<string>("");
  const [optionDue, setOptionDue] = useState<string>("");

  const showDropdownDueHandler = () => {
    setShowDropdownDue(!showDropdownDue);
  };

  const onAddNewTaskHandler = () => {
    const newTask: Task = {
      id: uuidv4(),
      title: inputTask,
      due_date: optionDue,
    };
    setDataTask((prevTask) => (prevTask ? [...prevTask, newTask] : [newTask]));
    setInputTask("");
  };

  const onChangeInputTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTask(e.target.value);
  };

  return (
    <div className="add__new--container">
      <div className="add__new">
        <div
          data-tooltip-id="add_new-tooltip"
          className={`add__new--icon ${
            inputTask !== "" ? "" : "disabled__btn"
          }`}
          onClick={onAddNewTaskHandler}
        >
          <HiPlus />
        </div>
        <Tooltip id="add_new-tooltip" place="top" content="Add new task" />
        <input
          type="text"
          placeholder="Add New Task"
          className="add__new--input"
          onChange={onChangeInputTaskHandler}
          value={inputTask}
        />
      </div>
      <div className="set__due">
        <div style={{ display: "flex" }}>
          <div
            data-tooltip-id="set__due-tooltip"
            onClick={showDropdownDueHandler}
            className={
              optionDue ? "set__due--select set__due--icon" : "set__due--icon"
            }
            data-tooltip-delay-hide={1000}
          >
            <IoCalendarOutline />
            {optionDue && (
              <p className="set__due--option">{checkTypeDueDate(optionDue)}</p>
            )}
          </div>
        </div>
        {showDropdownDue && (
          <DropdownSetDue
            showDropdownDue={showDropdownDue}
            setShowDropdownDue={setShowDropdownDue}
            setOptionDue={setOptionDue}
          />
        )}
        {!showDropdownDue && (
          <Tooltip
            id="set__due-tooltip"
            place="bottom"
            content="Add due date"
          />
        )}
      </div>
    </div>
  );
};

export default AddNewTask;
