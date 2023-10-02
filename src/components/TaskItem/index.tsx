import React, { useState } from "react";
import { HiStar, HiOutlineChevronRight, HiOutlineStar } from "react-icons/hi";
import { Tooltip } from "react-tooltip";

import { Task } from "../../interface";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [important, setImportant] = useState(false);

  const checkImportantHandler = () => {
    setImportant(!important);
  };

  return (
    <div className="task">
      <div className="task__checkbox-title">
        <input
          type="checkbox"
          name="isComplete"
          className="task__checkbox--complete"
        />
        <p className="task__title">{task?.title}</p>
      </div>
      <div className="task__important-showDetails">
        <div
          data-tooltip-id="important-tooltip"
          className="task__important--icon"
          onClick={checkImportantHandler}
        >
          {important ? <HiStar /> : <HiOutlineStar />}
        </div>
        <Tooltip id="important-tooltip" place="top" content="Add new task" />
        <div className="task__showDetails--icon">
          <HiOutlineChevronRight />
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
