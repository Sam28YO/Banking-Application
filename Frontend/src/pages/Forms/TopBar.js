import React from 'react';

const FixedTopBar = ({ percentage, sections }) => {
    return (
        <div className="fixed top-0 left-0 right-0 bg-blue-400 text-black p-3 flex flex-col">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>

            <div className='flex flex-row justify-between px-32'>
                {sections.map((section, index) => (
                    <p key={index}>{section}</p>
                ))}
            </div>

        </div>
    );
};

export default FixedTopBar;
