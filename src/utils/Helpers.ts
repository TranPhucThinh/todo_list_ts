import moment from "moment";

import { DATE_FORMAT, typesDueDate } from "./variables";

export const checkTypeDueDate = (type: string | undefined | null) => {
  if (type === typesDueDate.TODAY) {
    return "Today";
  } else if (type === typesDueDate.TOMORROW) {
    return "Tomorrow";
  } else if (type === typesDueDate.NEXT_WEEK) {
    const currentDate = moment();
    const nextWeekDay = currentDate.clone().add(6, "day");
    return nextWeekDay.format(DATE_FORMAT.DAY_MONTH_FULL);
  } else {
    return type;
  }
};

export const convertPayloadDueDate = (type: string | undefined | null) => {
  if (type === typesDueDate.TODAY) {
    return moment().format(DATE_FORMAT.DAY_MONTH_FULL);
  } else if (type === typesDueDate.TOMORROW) {
    return moment().add(1, "days").format(DATE_FORMAT.DAY_MONTH_FULL);
  } else if (type === typesDueDate.NEXT_WEEK) {
    return moment().add(6, "days").format(DATE_FORMAT.DAY_MONTH_FULL);
  } else {
    return type;
  }
};

export const convertTextToDate = (type: string | undefined | null) => {
  if (type === typesDueDate.TODAY) {
    return moment();
  } else if (type === typesDueDate.TOMORROW) {
    return moment().add(1, "days");
  } else if (type === typesDueDate.NEXT_WEEK) {
    return moment().add(6, "days");
  } else {
    return type;
  }
};

export const convertFullDateToDate = (date: string | undefined | null) => {
  const today = moment().format(DATE_FORMAT.DAY_MONTH_FULL);
  const tomorrow = moment().add(1, "days").format(DATE_FORMAT.DAY_MONTH_FULL);
  const nextWeek = moment().add(6, "days").format(DATE_FORMAT.DAY_MONTH_FULL);

  if (moment(date).isSame(today, "day")) {
    return "Today";
  } else if (moment(date).isSame(tomorrow, "day")) {
    return "Tomorrow";
  } else if (moment(date).isSame(nextWeek, "day")) {
    return moment().add(6, "days").format(DATE_FORMAT.DAY_MONTH_FULL);
  } else {
    return date;
  }
};
