import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [checkedState, setCheckedState] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleOnChange = (index) => {
    const updatedCheckedState = checkedState.map((item, idx) =>
      idx === index ? !item : item
    );
    setCheckedState(updatedCheckedState);
    const allChecked = updatedCheckedState.every((item) => item);
    setIsButtonEnabled(allChecked);
  };

  return (
    <div className="bg-slate-300 lg:px-10">
      <div className="bg-blue-400 h-20 md:h-28 mx-auto rounded-b-xl lg:h-36 "></div>
      <div className="mx-auto border-2 my-6 md:my-9 lg:mx-32 bg-white rounded-xl px-4 md:px-8 lg:my-16">
        <div className="mt-5">
          <p className="underline text-xl text-center">
            Important Documents To Review
          </p>
          <p className="text-center">
            Please open and read all of the following important documents to
            proceed further
          </p>
          <div className="text-center">
            <p className="py-1">
              <u>Notes:-</u>
            </p>
            <p className="py-1">
              1. You won't be able to continue until you've done as mentioned
              above.
            </p>
            <p className="py-1">
              2. Please save copies of them for future reference.
            </p>
            <p className="py-1">
              3. If you have any questions about the content of the documents
              please contact us
            </p>
          </div>
        </div>
        <div className="mt-8 md:mt-10 mx-auto max-w-md md:max-w-2xl">
          <div className="flex flex-wrap justify-center gap-4">
            <div className="w-full md:w-1/2 flex items-center">
              <input
                type="checkbox"
                checked={checkedState[0]}
                onChange={() => handleOnChange(0)}
                className="h-6 w-6 flex self-center mr-2"
              />
              <label className="flex self-center">Checkbox 1</label>
            </div>
            <div className="w-full md:w-1/2 flex items-center">
              <input
                type="checkbox"
                checked={checkedState[1]}
                onChange={() => handleOnChange(1)}
                className="h-6 w-6 flex self-center mr-2"
              />
              <label className="flex self-center">Checkbox 2</label>
            </div>
            <div className="w-full md:w-1/2 flex items-center">
              <input
                type="checkbox"
                checked={checkedState[2]}
                onChange={() => handleOnChange(2)}
                className="h-6 w-6 flex self-center mr-2"
              />
              <label className="flex self-center">Checkbox 3</label>
            </div>
            <div className="w-full md:w-1/2 flex items-center">
              <input
                type="checkbox"
                checked={checkedState[3]}
                onChange={() => handleOnChange(3)}
                className="h-6 w-6 flex self-center mr-2"
              />
              <label className="flex self-center">Checkbox 4</label>
            </div>
          </div>
          <div className="flex justify-center my-6">
            <button
              className={`border-2 w-full md:w-64 h-14 rounded-full ${
                isButtonEnabled
                  ? "bg-blue-400"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!isButtonEnabled}

              onClick={() => isButtonEnabled && navigate('/personalDetails')}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
      <div className="h-20 md:h-28 bg-blue-400 mx-auto rounded-t-xl lg:h-36"></div>
    </div>
  );
};


export default SignUp;

