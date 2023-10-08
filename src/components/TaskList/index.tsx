import React from "react";

import { Task } from "../../interface";
import TaskItem from "../TaskItem";
import "./taskList.scss";

interface TaskListProps {
  tasksList?: Task[];
  setDataTask: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = ({ tasksList, setDataTask }) => {
  const taskInCompleted = tasksList?.filter((task) => !task?.isCompleted);

  return (
    <div className="task__list">
      {taskInCompleted?.map((task, index) => {
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

export default TaskList;
