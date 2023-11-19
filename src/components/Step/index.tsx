import React, { ChangeEvent, useState } from "react";
import { GoCheckCircleFill, GoCircle } from "react-icons/go";
import { IoMdClose } from "react-icons/io";

import "./step.scss";
import { Step } from "../../interface";

interface StepProps {
  step: Step;
  saveEditStep: (_id: string, _value: string) => void;
  toggleCompleteStep: (_id: string) => void;
  removeStep: (_id: string) => void;
  disabledSaveBtn: (_value: boolean) => void;
}

const Index: React.FC<StepProps> = ({
  step,
  saveEditStep,
  toggleCompleteStep,
  removeStep,
  disabledSaveBtn,
}) => {
  const [inputStep, setInputStep] = useState<string>(step.title);

  const editStepHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newInputValue = e.target.value;

    setInputStep(newInputValue);

    if (newInputValue !== step.title) {
      disabledSaveBtn(false);
    } else {
      disabledSaveBtn(true);
    }
  };

  const toggleCompleteStepHandler = (id: string) => {
    toggleCompleteStep(id);
    disabledSaveBtn(false);
  };

  const removeStepHandler = (id: string) => {
    removeStep(id);
    disabledSaveBtn(false);
  };

  const saveStepHandler = (id: string) => {
    saveEditStep(id, inputStep);

    if (inputStep !== step.title) {
      disabledSaveBtn(false);
    } else {
      disabledSaveBtn(true);
    }

    if (!inputStep) removeStepHandler(id);
  };

  return (
    <div className="step">
      <div className="step__checkbox-title">
        <div
          className="checkbox"
          onClick={() => toggleCompleteStepHandler(step.id)}
        >
          {step?.isCompleted ? <GoCheckCircleFill /> : <GoCircle />}
        </div>
        <input
          className="title"
          type="text"
          value={inputStep}
          onChange={editStepHandler}
          onBlur={() => saveStepHandler(step.id)}
        />
      </div>
      <div className="icon__remove" onClick={() => removeStepHandler(step.id)}>
        <IoMdClose />
      </div>
    </div>
  );
};

export default Index;
