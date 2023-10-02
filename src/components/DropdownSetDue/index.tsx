import React from "react";

import todayCalendar from "../../assets/images/today-calendar.svg";
import tomorrowCalendar from "../../assets/images/tomorrow-calendar.svg";
import nextWeekCalendar from "../../assets/images/nextweek-calendar.svg";
import pickDateCalendar from "../../assets/images/pickDate-calendar.svg";
import "./dropdownSetDue.scss";

interface DropdownProps {
  showDropdownDue: boolean;
  setShowDropdownDue: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownSetDue: React.FC<DropdownProps> = ({
  showDropdownDue,
  setShowDropdownDue,
}) => {
  const closeDropdownDueHandler = () => {
    setShowDropdownDue(!showDropdownDue);
  };

  return (
    <>
      <div className="overlay" onClick={closeDropdownDueHandler} />
      <div className="dropdown__container">
        <div className="dropdown__header">Due</div>
        <div className="dropdown__content--options">
          <div className="option">
            <div className="icon__title">
              <img src={todayCalendar} alt="today" />
              <div className="option__title">Today</div>
            </div>
            <div className="option__date">Mon</div>
          </div>
          <div className="option">
            <div className="icon__title">
              <img src={tomorrowCalendar} alt="Tomorrow" />
              <div className="option__title">Tomorrow</div>
            </div>
            <div className="option__date">Tue</div>
          </div>
          <div className="option">
            <div className="icon__title">
              <img src={nextWeekCalendar} alt="Next week" />
              <div className="option__title">Next week</div>
            </div>
            <div className="option__date">Mon</div>
          </div>
        </div>
        <div className="dropdown__content--pick-date">
          <img src={pickDateCalendar} alt="Pick a date" />
          <div className="pick-date__title">Pick a date</div>
        </div>
      </div>
    </>
  );
};

export default DropdownSetDue;
