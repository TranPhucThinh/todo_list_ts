import moment from "moment";

import { typesDueDate } from "./variables";

export const checkTypeDueDate = (type: string) => {
  if (type === typesDueDate.TODAY) {
    return "Today";
  } else if (type === typesDueDate.TOMORROW) {
    return "Tomorrow";
  } else {
    const currentDate = moment();
    const nextWeekDay = currentDate.clone().add(6, "day");
    return nextWeekDay.format("ddd, MMMM D");
  }
};
