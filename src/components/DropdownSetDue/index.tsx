import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

import nextWeekCalendar from "../../assets/images/nextweek-calendar.svg";
import pickDateCalendar from "../../assets/images/pickDate-calendar.svg";
import todayCalendar from "../../assets/images/today-calendar.svg";
import tomorrowCalendar from "../../assets/images/tomorrow-calendar.svg";
import "./dropdownSetDue.scss";

interface DropdownProps {
  showDropdownDue: boolean;
  setShowDropdownDue: React.Dispatch<React.SetStateAction<boolean>>;
  optionDue: string;
  setOptionDue: (_value: string) => void;
  openDatePicker: () => void;
  className: string;
}

const DropdownSetDue: React.FC<DropdownProps> = ({
  showDropdownDue,
  setShowDropdownDue,
  optionDue,
  setOptionDue,
  openDatePicker,
  className,
}) => {
  const closeDropdownDueHandler = () => {
    setShowDropdownDue(!showDropdownDue);
  };

  const selectOptionDueHandler = (value: string) => {
    setShowDropdownDue(!showDropdownDue);
    setOptionDue(value);
  };

  return (
    <>
      <div className="overlay" onClick={closeDropdownDueHandler} />
      <div className={`${className}`}>
        <div className="dropdown__header">Due</div>
        <div className="dropdown__content--options">
          <div
            className="option"
            onClick={() => selectOptionDueHandler("TODAY")}
          >
            <div className="icon__title">
              <img src={todayCalendar} alt="today" />
              <p className="option__title">Today</p>
            </div>
            <p className="option__date">Mon</p>
          </div>
          <div
            className="option"
            onClick={() => selectOptionDueHandler("TOMORROW")}
          >
            <div className="icon__title">
              <img src={tomorrowCalendar} alt="Tomorrow" />
              <p className="option__title">Tomorrow</p>
            </div>
            <p className="option__date">Tue</p>
          </div>
          <div
            className="option"
            onClick={() => selectOptionDueHandler("NEXT_WEEK")}
          >
            <div className="icon__title">
              <img src={nextWeekCalendar} alt="Next week" />
              <p className="option__title">Next week</p>
            </div>
            <p className="option__date">Mon</p>
          </div>
        </div>
        <div className="dropdown__content--pick-date" onClick={openDatePicker}>
          <div className="pick-date__logo-title">
            <img src={pickDateCalendar} alt="Pick a date" />
            <p className="logo-title__title">Pick a date</p>
          </div>
        </div>
        {optionDue && (
          <div
            className="dropdown__content--remove-due"
            onClick={() => selectOptionDueHandler("")}
          >
            <div className="remove-due__icon">
              <RiDeleteBin6Line />
            </div>
            <p className="remove-due__title">Remove due date</p>
          </div>
        )}
      </div>
    </>
  );
};

export default DropdownSetDue;
