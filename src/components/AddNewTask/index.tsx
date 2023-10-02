import React, { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { IoCalendarOutline } from "react-icons/io5";
import { Tooltip } from "react-tooltip";

import "./addNewTask.scss";
import DropdownSetDue from "../DropdownSetDue";

const AddNewTask: React.FC = () => {
  const [showDropdownDue, setShowDropdownDue] = useState(false);

  const showDropdownDueHandler = () => {
    setShowDropdownDue(!showDropdownDue);
  };

  return (
    <div className="add__new--container">
      <div className="add__new">
        <div data-tooltip-id="add_new-tooltip" className="add__new--icon">
          <HiPlus />
        </div>
        <Tooltip id="add_new-tooltip" place="top" content="Add new task" />
        <input
          type="text"
          placeholder="Add New Task"
          className="add__new--input"
        />
      </div>
      <div className="set__due">
        <div
          data-tooltip-id="set__due-tooltip"
          onClick={showDropdownDueHandler}
          className="set__due--icon"
          data-tooltip-delay-hide={1000}
        >
          <IoCalendarOutline />
        </div>
        {showDropdownDue && (
          <DropdownSetDue
            showDropdownDue={showDropdownDue}
            setShowDropdownDue={setShowDropdownDue}
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
