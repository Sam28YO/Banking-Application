import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FixedTopBar from './TopBar';

const ChangePasswordForm = () => {
  const [progress, setProgress] = useState(0);
  const sections = ["Change password", "Verification", "Confirmation"];
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [conditions, setConditions] = useState({
    length: false,
    number: false,
    uppercase: false,
    sequence: false,
  });
  const [newPasswordValid, setNewPasswordValid] = useState(false); 
  const navigate = useNavigate();

  //have to add logic to confirm current password
  const validatePassword = (password) => {
    const length = password.length >= 8;
    const number = /\d/.test(password);
    const uppercase = /[A-Z]/.test(password);
    const sequence = !/(.)\1{2,}/.test(password) && !/(012|123|234|345|456|567|678|789)/.test(password);
    setConditions({ length, number, uppercase, sequence });
    setNewPasswordValid(length && number && uppercase && sequence); 
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};
    if (!currentPassword) formErrors.currentPassword = 'Current password is required';
    if (!newPassword) formErrors.newPassword = 'New password is required';
    if (!confirmPassword) formErrors.confirmPassword = 'Please confirm your password';
    if (newPassword !== confirmPassword) formErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(formErrors).length === 0) {
      setProgress(33.33);
      //navigate('/signup'); 
    } else {
      setErrors(formErrors);
    }
  };

 
  const handleCancel = () => {
    navigate('/privacySecurity'); 
  };

  return (
    <div className='flex flex-col min-h-screen bg-slate-300 items-center justify-center'>
      <FixedTopBar percentage={progress} sections={sections} />
      <form className='flex flex-col w-3/5 mt-6 p-8 bg-white shadow-md rounded-lg' onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-gray-700 font-bold mb-2'>Current Password</label>
          <input
            type='password'
            className={`w-full p-2 border rounded ${errors.currentPassword ? 'border-red-500' : ''}`}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          {errors.currentPassword && <p className='text-red-500 text-xs italic'>{errors.currentPassword}</p>}
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 font-bold mb-2'>New Password</label>
          <input
            type='password'
            className={`w-full p-2 border rounded ${errors.newPassword ? 'border-red-500' : ''}`}
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              validatePassword(e.target.value);
            }}
          />
          <p className={`text-xs italic ${conditions.length ? 'text-green-500' : 'text-gray-500'}`}>
            Must be at least 8 characters long
          </p>
          <p className={`text-xs italic ${conditions.number ? 'text-green-500' : 'text-gray-500'}`}>
            Must contain at least 1 number
          </p>
          <p className={`text-xs italic ${conditions.uppercase ? 'text-green-500' : 'text-gray-500'}`}>
            Must contain at least 1 uppercase letter
          </p>
          <p className={`text-xs italic ${conditions.sequence ? 'text-green-500' : 'text-gray-500'}`}>
            Must not have sequences or repeated characters like 1234, 3333, zzzz
          </p>
          {errors.newPassword && <p className='text-red-500 text-xs italic'>{errors.newPassword}</p>}
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 font-bold mb-2'>Confirm Password</label>
          <input
            type='password'
            className={`w-full p-2 border rounded ${errors.confirmPassword ? 'border-red-500' : ''}`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={!newPasswordValid} 
          />
          <p className={`text-xs italic ${confirmPassword && newPassword === confirmPassword ? 'text-green-500' : 'text-gray-500'}`}>
            Please enter the same password
          </p>
          {errors.confirmPassword && <p className='text-red-500 text-xs italic'>{errors.confirmPassword}</p>}
        </div>
        <div className='flex justify-between'>
          <button type='button' className='bg-red-500 text-white font-bold py-2 px-4 rounded' onClick={handleCancel}>
            Cancel
          </button>
          <button type='submit' className='bg-blue-500 text-white font-bold py-2 px-4 rounded'>
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
