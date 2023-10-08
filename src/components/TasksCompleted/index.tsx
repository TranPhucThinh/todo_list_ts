import React from "react";

import { Task } from "../../interface";
import TaskItem from "../TaskItem";

interface TasksCompletedProps {
  tasksList?: Task[];
  setDataTask: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TasksCompleted: React.FC<TasksCompletedProps> = ({
  tasksList,
  setDataTask,
}) => {
  const tasksCompleted = tasksList?.filter((task) => task.isCompleted);

  return (
    <div className="task__list">
      {tasksCompleted?.map((task, index) => {
        return (
          <div key={index}>
            <TaskItem
              task={task}
              tasksList={tasksList}
              setDataTask={setDataTask}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TasksCompleted;
