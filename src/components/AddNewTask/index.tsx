import React, { ChangeEvent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HiPlus } from "react-icons/hi";
import { IoCalendarOutline } from "react-icons/io5";
import { Tooltip } from "react-tooltip";
import { v4 as uuidv4 } from "uuid";

import { Task } from "../../interface";
import { checkTypeDueDate, transferPayloadDueDate } from "../../utils/Helpers";
import DropdownSetDue from "../DropdownSetDue";
import "./addNewTask.scss";
import moment from "moment";
import { DATE_FORMAT } from "../../utils/variables";

interface AddNewTaskProps {
  setDataTask: React.Dispatch<React.SetStateAction<Task[]>>;
}

const AddNewTask: React.FC<AddNewTaskProps> = ({ setDataTask }) => {
  const [showDropdownDue, setShowDropdownDue] = useState<boolean>(false);
  const [inputTask, setInputTask] = useState<string>("");
  const [optionDue, setOptionDue] = useState<string>("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [datePickerIsOpen, setDatePickerIsOpen] = useState<boolean>(false);

  const showDropdownDueHandler = () => {
    setShowDropdownDue(!showDropdownDue);
  };

  const onAddNewTaskHandler = () => {
    const newTask: Task = {
      id: uuidv4(),
      title: inputTask,
      due_date: optionDue !== "" ? transferPayloadDueDate(optionDue) : null,
      isCompleted: false,
    };
    setDataTask((prevTask) => (prevTask ? [...prevTask, newTask] : [newTask]));
    setInputTask("");
    setOptionDue("");
  };

  const onChangeInputTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTask(e.target.value);
  };

  const openDatePicker = () => {
    setDatePickerIsOpen(!datePickerIsOpen);
    setShowDropdownDue(false);
  };

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onAddNewTaskHandler();
    }
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
          onKeyDown={onKeyDownHandler}
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
        <DatePicker
          onClickOutside={openDatePicker}
          open={datePickerIsOpen}
          onChange={(date) => setDate(date)}
        >
          <div className="date__picker--btn">
            <button
              onClick={() => {
                setOptionDue(moment(date).format(DATE_FORMAT.DAY_MONTH_FULL));
                setDatePickerIsOpen(false);
              }}
            >
              Save
            </button>
          </div>
        </DatePicker>
        {showDropdownDue && (
          <DropdownSetDue
            showDropdownDue={showDropdownDue}
            setShowDropdownDue={setShowDropdownDue}
            setOptionDue={setOptionDue}
            openDatePicker={openDatePicker}
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
