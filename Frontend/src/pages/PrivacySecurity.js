import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const PrivacySecurity = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    //to go back to home page
    // navigate('/'); 
  };

  const handleChangePassword = () => {
    navigate('/changePassword'); 
  };

  return (
    <div className='flex flex-col min-h-screen bg-slate-300 items-center justify-center'>
      {/* have to add dashboard top bar here */}
      <div className='flex flex-col w-4/5 items-start justify-center mt-8'>
        <span className='flex items-center w-1/6 cursor-pointer my-4' onClick={handleGoBack}>
          <div className='flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full shadow-md'>
            <FontAwesomeIcon icon={faArrowLeft} className=' text-white' />
          </div>
          <p className='px-8 font-medium'>Go back</p>
        </span>
        <h1 className='text-2xl font-bold my-4'>Privacy and Security</h1>
        <div className='flex flex-col items-start w-4/5 mt-6 p-8 bg-white shadow-md rounded-lg cursor-pointer' onClick={handleChangePassword}>
          <span className='flex flex-row w-full py-2'>
            <p className='font-bold'>Change Password</p>
            <FontAwesomeIcon icon={faArrowRight} className='ml-auto text-xl text-blue-500' />
          </span>
          <p>Update your password to keep your account safe and protect your data.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacySecurity;
