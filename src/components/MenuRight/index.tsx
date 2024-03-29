import axios from "axios";
import moment from "moment";
import React, { ChangeEvent, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import {
  GoCheckCircleFill,
  GoCircle,
  GoSidebarCollapse,
  GoTrash,
} from "react-icons/go";
import { HiOutlineStar, HiPlus, HiStar } from "react-icons/hi";
import { IoCalendarOutline } from "react-icons/io5";
import { Tooltip } from "react-tooltip";
import { v4 as uuidv4 } from "uuid";

import { useTask } from "../../contexts/taskContext";
import { Step } from "../../interface";
import {
  convertPayloadDueDate,
  convertTextToDate,
  renderTextDueDate,
} from "../../utils/Helpers";
import { DATE_FORMAT } from "../../utils/variables";
import DropdownSetDue from "../DropdownSetDue";
import StepItem from "../Step";
import "./menuRight.scss";

interface MenuRightProps {
  notifyUpdate: () => void;
}

const MenuRight: React.FC<MenuRightProps> = ({ notifyUpdate }) => {
  const { dispatch, state } = useTask();

  const [inputStep, setInputStep] = useState<string>("");
  const [steps, setSteps] = useState<Step[] | null | undefined>([]);
  const [showDropdownDue, setShowDropdownDue] = useState<boolean>(false);
  const [isDueDate, setIsDueDate] = useState<boolean>(false);
  const [datePickerIsOpen, setDatePickerIsOpen] = useState<boolean>(false);
  const [optionDue, setOptionDue] = useState<string | null | undefined>("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [inputTask, setInputTask] = useState<string | undefined>("");
  const [disabledBtn, setDisableBtn] = useState<boolean>(true);

  const isOpenMenuRight = state?.isOpenDetailsTask;
  const taskDetails = state?.taskDetails;
  const selectedTask = state?.tasks?.find(
    (task) => task?.id === taskDetails?.id,
  );

  // check due task
  const checkDueDateTask = () => {
    if (optionDue) {
      const today = moment().format(DATE_FORMAT.DAY_MONTH_FULL);
      const due = moment(convertTextToDate(optionDue));

      const todayDate = moment(today).startOf("day");
      const dueDate = moment(due).startOf("day");
      if (dueDate.isSameOrAfter(todayDate, "day")) {
        setIsDueDate(false);
      } else {
        setIsDueDate(true);
      }
    }
  };

  const editTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTask(e.target.value);
  };

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
      addNewTaskStepHandler();
      setDisableBtn(false);
    }
  };

  const addNewTaskStepHandler = () => {
    setSteps((prevSteps) => {
      const newStep = { id: uuidv4(), title: inputStep, isCompleted: false };

      if (prevSteps === null || prevSteps === undefined) {
        return [newStep];
      }

      return [...prevSteps, newStep];
    });

    setInputStep("");
  };

  const saveEditStep = (id: string, value: string) => {
    setSteps(
      (prevSteps) =>
        prevSteps?.map((step: Step) => {
          if (step.id === id) {
            return {
              ...step,
              title: value,
            };
          }

          return step;
        }),
    );
  };

  const toggleCompleteStep = (id: string) => {
    setSteps(
      (prevSteps) =>
        prevSteps?.map((step: Step) => {
          if (step.id === id) {
            return { ...step, isCompleted: !step.isCompleted };
          }

          return step;
        }),
    );
  };

  const removeStep = (id: string) => {
    setSteps((prevSteps) => prevSteps?.filter((step: Step) => step.id !== id));
  };

  const disabledSaveBtn = (value: boolean) => {
    setDisableBtn(value);
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
    setDisableBtn(true);
  };

  const onDeleteTaskHandler = () => {
    dispatch({
      type: "TOGGLE_MODAL_DELETE",
      payload: true,
    });
  };

  const submitEditTaskHandler = async () => {
    await axios.put("http://localhost:3004/tasks/" + selectedTask?.id, {
      ...selectedTask,
      title: inputTask,
      due_date: convertPayloadDueDate(optionDue),
      steps: steps,
    });

    await fetchData();

    notifyUpdate();

    setDisableBtn(true);
  };

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3004/tasks");

    dispatch({ type: "GET_ALL_TASKS", payload: response?.data });
  };

  useEffect(() => {
    setOptionDue(selectedTask?.due_date);
    setSteps(taskDetails?.steps);
  }, [selectedTask?.id]);

  useEffect(() => {
    checkDueDateTask();
  }, [optionDue, selectedTask?.due_date]);

  useEffect(() => {
    setInputTask(selectedTask?.title);
  }, [selectedTask]);

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
          {steps?.map((step) => (
            <StepItem
              key={step.id}
              step={step}
              saveEditStep={saveEditStep}
              toggleCompleteStep={toggleCompleteStep}
              removeStep={removeStep}
              disabledSaveBtn={disabledSaveBtn}
            />
          ))}
          <div className="add__step">
            <div
              data-tooltip-id="add__step-tooltip"
              className={`add__step--icon ${
                inputStep !== "" ? "" : "disabled__btn"
              }`}
              onClick={addNewTaskStepHandler}
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
          {taskDetails?.due_date ? (
            <div
              style={isDueDate ? { color: "#a80000" } : {}}
              className="set__due--icon"
            >
              <IoCalendarOutline />
            </div>
          ) : (
            <IoCalendarOutline />
          )}
          {taskDetails?.due_date ? (
            <p
              style={isDueDate ? { color: "#a80000" } : {}}
              className="due-date"
            >
              Due {renderTextDueDate(optionDue)}
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

        <button
          onClick={submitEditTaskHandler}
          className={`${
            disabledBtn ? "disabled__save-btn" : ""
          } detail__task--btn`}
          disabled={disabledBtn}
        >
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
