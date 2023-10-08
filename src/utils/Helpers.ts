import moment from "moment";

import { DATE_FORMAT, typesDueDate } from "./variables";

export const checkTypeDueDate = (type: string) => {
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

export const transferPayloadDueDate = (type: string) => {
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
