import axios from "axios";
import React from "react";
import "react-toastify/dist/ReactToastify.css";

import { useTask } from "../../contexts/taskContext";
import "./modalConfirm.scss";

interface ModalConfirmProps {
  notify: () => void;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({ notify }) => {
  const { dispatch, state } = useTask();

  const taskDetails = state?.taskDetails;

  const onCancelDeleteHandler = () => {
    dispatch({ type: "TOGGLE_MODAL_DELETE", payload: false });
  };

  const onOkDeleteHandler = async (id: string) => {
    await axios.delete("http://localhost:3004/tasks/" + id);
    dispatch({ type: "DELETE_TASK", payload: id });
    dispatch({ type: "TOGGLE_MODAL_DELETE", payload: false });
    dispatch({
      type: "TOGGLE_DETAILS_TASK",
      payload: {
        taskDetails: { id: "", title: "string", isCompleted: false },
        isOpenDetailsTask: false,
      },
    });
    notify();
  };

  return (
    <div className="modal__wrapper">
      <div className="modal__container">
        <div className="modal__content">
          <p className="modal__title">This task will be permanently deleted</p>
          <p className="modal__message">
            You won&apos;t be able to undo this action{" "}
          </p>
          <div className="modal__footer">
            <button
              className="modal__footer--cancel"
              onClick={onCancelDeleteHandler}
            >
              Cancel
            </button>
            <button
              className="modal__footer--ok"
              onClick={() => onOkDeleteHandler(taskDetails?.id)}
            >
              Delete Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
