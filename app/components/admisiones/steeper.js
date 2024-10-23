import { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-center my-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
              index <= currentStep ? 'border-blue-500' : 'border-gray-300'
            }`}
          >
            {index < currentStep ? (
              <AiOutlineCheck className="text-blue-500" />
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
          {index < steps.length - 1 && (
            <div className="w-10 h-1 bg-gray-300 mx-2"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;