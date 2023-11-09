import axios from "axios";
import moment from "moment";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  GoCheckCircleFill,
  GoCircle,
  GoSidebarCollapse,
  GoTrash,
} from "react-icons/go";
import { HiOutlineStar, HiPlus, HiStar } from "react-icons/hi";
import { IoCalendarOutline } from "react-icons/io5";
import { Tooltip } from "react-tooltip";
import DatePicker from "react-datepicker";

import { useTask } from "../../contexts/taskContext";
import { DATE_FORMAT } from "../../utils/variables";
import DropdownSetDue from "../DropdownSetDue";
import "./menuRight.scss";
import { checkTypeDueDate, transferPayloadDueDate } from "../../utils/Helpers";

const MenuRight: React.FC = () => {
  const { dispatch, state } = useTask();

  const [inputStep, setInputStep] = useState<string>("");
  const [showDropdownDue, setShowDropdownDue] = useState<boolean>(false);
  const [isDueDate, setIsDueDate] = useState<boolean>(true);
  const [datePickerIsOpen, setDatePickerIsOpen] = useState<boolean>(false);
  const [optionDue, setOptionDue] = useState<string>("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [inputTask, setInputTask] = useState<string | undefined>("");

  const isOpenMenuRight = state?.isOpenDetailsTask;
  const taskDetails = state?.taskDetails;
  const selectedTask = state?.tasks?.find(
    (task) => task?.id === taskDetails?.id,
  );

  const editTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTask(e.target.value);
  };

  const checkDueDateTask = () => {
    if (selectedTask?.due_date) {
      const today = moment().format(DATE_FORMAT.DAY_MONTH_FULL);
      const dueDate = moment(selectedTask?.due_date);
      if (dueDate.isSameOrAfter(today, "day")) {
        setIsDueDate(true);
      } else {
        setIsDueDate(false);
      }
    }
  };

  useEffect(() => {
    checkDueDateTask();
    setInputTask(selectedTask?.title);
  }, [selectedTask]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3004/tasks");

    dispatch({ type: "GET_ALL_TASKS", payload: response?.data });
  };

  useEffect(() => {
    if (optionDue) {
      axios.put("http://localhost:3004/tasks/" + selectedTask?.id, {
        ...selectedTask,
        due_date: transferPayloadDueDate(optionDue),
      });

      dispatch({
        type: "UPDATE_DETAILS_TASK",
        payload: { ...taskDetails, due_date: optionDue },
      });

      fetchData();
    }
  }, [optionDue]);

  const onAddNewTaskStepHandler = () => {};

  const checkCompleteHandler = (id: string) => {
    axios.put("http://localhost:3004/tasks/" + id, {
      ...selectedTask,
      isCompleted: !selectedTask?.isCompleted,
    });
    dispatch({ type: "TOGGLE_COMPLETE", payload: id });
  };

  const checkImportantHandler = (id: string) => {
    axios.put("http://localhost:3004/tasks/" + id, {
      ...selectedTask,
      isImportant: !selectedTask?.isImportant,
    });
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

  const showDropdownDueHandler = () => {
    setShowDropdownDue(!showDropdownDue);
  };

  const openDatePicker = () => {
    setDatePickerIsOpen(!datePickerIsOpen);
    setShowDropdownDue(false);
  };

  const onCloseDetailsTaskHandler = () => {
    dispatch({
      type: "TOGGLE_DETAILS_TASK",
      payload: {
        taskDetails: { id: "", title: "string", isCompleted: false },
        isOpenDetailsTask: false,
      },
    });
  };

  const onDeleteTaskHandler = () => {
    dispatch({
      type: "TOGGLE_MODAL_DELETE",
      payload: true,
    });
  };

  const submitEditTaskHandler = () => {
    console.log("date:", date);

    // axios.put("http://localhost:3004/tasks/" + selectedTask?.id, {
    //   ...selectedTask,
    //   title: inputTask,
    // });
  };

  return (
    <div
      className={isOpenMenuRight ? "menu__right--open" : "menu__right--close"}
    >
      <div className="menu__right--content">
        <div className="menu__right--info-task">
          <div className="description__task">
            <div className="task__checkbox-title">
              <div
                onClick={() => checkCompleteHandler(taskDetails?.id)}
                style={{ color: "#2564cf" }}
                className="task__checkbox--complete"
              >
                {selectedTask?.isCompleted ? (
                  <GoCheckCircleFill />
                ) : (
                  <GoCircle />
                )}
              </div>
              <p
                className={`task__title ${
                  selectedTask?.isCompleted ? "task__completed" : ""
                } `}
              >
                <input
                  className="task__title--input"
                  type="text"
                  value={inputTask}
                  onChange={editTaskHandler}
                />
              </p>
            </div>
            {!selectedTask?.isCompleted && (
              <div
                className="task__important-showDetails"
                onClick={() => checkImportantHandler(taskDetails?.id)}
              >
                <>
                  <div
                    data-tooltip-id="important-tooltip"
                    className="task__important--icon"
                  >
                    {selectedTask?.isImportant ? <HiStar /> : <HiOutlineStar />}
                  </div>
                  <Tooltip
                    id="important-tooltip"
                    place="top"
                    content="Add important task"
                  />
                </>
              </div>
            )}
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
        <div className="menu__right--add-due" onClick={showDropdownDueHandler}>
          <div
            style={isDueDate ? {} : { color: "#a80000" }}
            className="set__due--icon"
          >
            <IoCalendarOutline />
          </div>
          {taskDetails?.due_date ? (
            <p
              style={isDueDate ? {} : { color: "#a80000" }}
              className="due-date"
            >
              Due {checkTypeDueDate(taskDetails?.due_date)}
            </p>
          ) : (
            <p className="no__due-date">Add due date</p>
          )}
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
            optionDue={optionDue}
            setOptionDue={setOptionDue}
            openDatePicker={openDatePicker}
            className="dropdown__container--right"
          />
        )}

        <button onClick={submitEditTaskHandler} className="detail__task--btn">
          Save
        </button>
      </div>
      <div className="menu__right--option">
        <div className="option__icon" onClick={onCloseDetailsTaskHandler}>
          <GoSidebarCollapse />
        </div>
        <div className="option__icon" onClick={onDeleteTaskHandler}>
          <GoTrash />
        </div>
      </div>
    </div>
  );
};

export default MenuRight;
