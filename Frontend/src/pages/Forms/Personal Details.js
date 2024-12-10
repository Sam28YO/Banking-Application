import React, { useState } from 'react';
import AddressDetails from './AddressDetails';
import FixedTopBar from './TopBar';

const Personal_Details = () => {
  const [errors, setErrors] = useState({});
  const [personalSubmitted, setPersonalSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);
  const sections = ["Personal details", "Account details", "Final details"];

  const calculateAge = (day, month, year) => {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const firstName = form.elements['first-name'];
    const lastName = form.elements['last-name'];
    const day = form.elements['day'];
    const month = form.elements['month'];
    const year = form.elements['year'];

    setPersonalSubmitted(false);

    const newErrors = {};

    if (!firstName.value) newErrors.firstName = 'Please enter your first name';
    if (!lastName.value) newErrors.lastName = 'Please enter your last name';
    if (!day.value) newErrors.day = 'Please enter the day';
    if (!month.value) newErrors.month = 'Please enter the month';
    if (!year.value) newErrors.year = 'Please enter the year';

    if (!newErrors.day && !newErrors.month && !newErrors.year) {
      const age = calculateAge(day.value, month.value, year.value);
      if (age < 18) {
        newErrors.age = 'You must be at least 18 years old';
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setPersonalSubmitted(true);
      setProgress(16.67); 

      const customerData = {
        firstName: firstName.value,
        lastName: lastName.value,
        dateOfBirth: `${year.value}-${month.value}-${day.value}`,
      };
//have to fix, if saving data from each form individually
      try {
        const response = await fetch("http://localhost:8050/api/v1/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customerData),
        });

        const data = await response.json();

        if (data.success) {
          console.log("Customer registered successfully:", data.customer);
        } else {
          console.log("Registration failed:", data.message);
        }
      } catch (error) {
        console.error("Error in registration:", error);
      }
    }
  };

  const handleAddressCompleted = () => {
    setProgress(33.33);
  };

  return (
    <div className='flex flex-col min-h-screen bg-slate-300 items-center justify-center'>
      <FixedTopBar percentage={progress} sections={sections} /> 
      <div className='flex flex-col w-3/5 items-center justify-center mt-8'>
        <form onSubmit={handleSubmit} className='w-full'>
          <div className="flex flex-col items-center justify-center min-h-screen bg-slate-300 w-full">
            <div className="flex flex-col items-start bg-white border border-gray-300 rounded-lg p-4 shadow-md text-center w-full mt-12">
              <h2 className="text-xl font-semibold mb-2">Your journey starts here</h2>
              <p className="mb-2">Set up your Easy access account</p>
            </div>

            <div className="flex flex-col items-start bg-white border border-gray-300 rounded-lg p-10 shadow-md text-center w-full mt-4 mb-4">
              <p className="mb-2">
                <span className="text-blue-700 font-semibold">01 </span>
                <span className="font-medium">Personal Details </span>
              </p>
              <p className="mb-2">Tell us a bit about yourself</p>
              <p className="mb-4">Please provide your full legal name.</p>

              <div className='flex flex-row w-full'>
                <div className='flex flex-col mr-10 w-full'>
                  <p className={`self-start mb-1 text-sm ${errors.firstName ? 'text-red-600' : 'text-gray-600'}`}>FIRST NAME*</p>
                  <input className={`border ${errors.firstName ? 'border-red-600' : 'border-gray-300'} rounded-lg p-2 mb-2 w-full`} placeholder='First name' name='first-name' type='text' />
                  {errors.firstName && <p className='self-start mb-2 text-sm text-red-600'>{errors.firstName}</p>}
                  <p className={`self-start mb-1 text-sm ${errors.lastName ? 'text-red-600' : 'text-gray-600'}`}>LAST NAME*</p>
                  <input className={`border ${errors.lastName ? 'border-red-600' : 'border-gray-300'} rounded-lg p-2 mb-2 w-full`} placeholder='Last name' name='last-name' type='text' />
                  {errors.lastName && <p className='self-start mb-2 text-sm text-red-600'>{errors.lastName}</p>}
                </div>
                <div className='flex flex-col w-full'>
                  <p className="self-start mb-1 text-sm text-gray-600">MIDDLE NAME (OPTIONAL)</p>
                  <input className="border border-gray-300 rounded-lg p-2 mb-2 w-full" placeholder='Middle name' type='text' />
                </div>
              </div>

              <div className='flex flex-col self-start w-full'>
                <p className={`self-start mb-1 text-sm ${errors.day || errors.month || errors.year ? 'text-red-600' : 'text-gray-600'}`}>DATE OF BIRTH*</p>
                <span className='flex flex-row w-1/2 justify-evenly'>
                  <select className={`border ${errors.day ? 'border-red-600' : 'border-gray-300'} rounded-lg p-2 mb-2 mr-1 w-1/3`} placeholder='DD' name='day' type='text'>
                    <option value=''>Day</option>
                    {[...Array(31).keys()].map(day => (
                      <option key={day + 1} value={day + 1}>{day + 1}</option>
                    ))}
                  </select>
                  
                  <select className={`border ${errors.month ? 'border-red-600' : 'border-gray-300'} rounded-lg p-2 mb-2 mr-1 w-1/3`} placeholder='MM' name='month' type='text'>
                    <option value=''>Month</option>
                    {[...Array(12).keys()].map(month => (
                      <option key={month + 1} value={month + 1}>{month + 1}</option>
                    ))}
                  </select>

                  <select className={`border ${errors.year ? 'border-red-600' : 'border-gray-300'} rounded-lg p-2 mb-2 mr-1 w-1/3`} placeholder='YYYY' name='year' type='text'>
                    <option value=''>Year</option>
                    {[...Array(100).keys()].map(year => (
                      <option key={2024 - year} value={2024 - year}>{2024 - year}</option>
                    ))}
                  </select>
                </span>

                {(errors.day || errors.month || errors.year) && <p className='self-start mb-4 text-sm text-red-600'>Please select {errors.day}{errors.month}{errors.year}</p>}
                {errors.age && <p className='self-start mb-4 text-sm text-red-600'>{errors.age}</p>}
              </div>
            </div>

            <button type="submit" className="bg-blue-600 text-white rounded-lg py-2 px-4 my-2 hover:border-2 hover:border-white self-end">Continue</button>
          </div>
        </form>
      </div>
      {personalSubmitted && (
        <div className="flex flex-col items-center justify-center mt-4 w-3/5">
          <AddressDetails onComplete={handleAddressCompleted} />
        </div>
      )}
    </div>
  );
};

export default Personal_Details;
