import React from 'react';

const FixedTopBar = ({ percentage }) => {
    return (
        <div className="fixed top-0 left-0 right-0 bg-white text-gray-600 p-3 flex flex-col">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                    className="bg-red-600 h-2.5 rounded-full"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>

            <div className='flex flex-row justify-between px-32'>
                <p>Personal details</p>
                <p>Account details</p>
                <p>Final details</p>
            </div>

        </div>
    );
};

export default FixedTopBar;
