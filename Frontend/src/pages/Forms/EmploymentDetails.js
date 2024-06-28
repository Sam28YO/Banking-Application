import React, { useState } from "react";
import FixedTopBar from './TopBar';

const EmploymentDetails = () => {
  const [progress, setProgress] = useState(33.33);
  const [selectedEmployment, setSelectedEmployment] = useState("");
  const [selectedRange, setSelectedRange] = useState("");
  const [industry, setIndustry] = useState("");
  const [occupation, setOccupation] = useState("");
  const [errors, setErrors] = useState({});

  const handleSalaryClick = (range) => {
    setSelectedRange(range);
  };

  const handleButtonClick = (status) => {
    setSelectedEmployment(status);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!selectedEmployment) {
      newErrors.selectedEmployment = "Please select your employment status.";
    }
    if (!industry) {
      newErrors.industry = "Please select your industry.";
    }
    if (!occupation) {
      newErrors.occupation = "Please select your occupation.";
    }
    if (!selectedRange) {
      newErrors.selectedRange = "Please select your annual income.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

//for saving info

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const apiUrl = "http://localhost:4000/api/v1/auth/employmentDetails";

      const data = {
        employmentStatus: selectedEmployment,
        industry,
        occupation,
        annualIncome: selectedRange,
      };

      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const renderFormFields = () => {
    switch (selectedEmployment) {
      case "Full-time employed":
        return (
          <div className="flex flex-col items-start w-full">
                        <p className="font-medium">What industry do you work in?</p>
            <p className="mb-3">Please select the closest option to your industry.</p>
            <select
              className="border-gray-300 border-2 rounded-lg p-2 mb-6 mr-1 w-1/3"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              <option value="">Select your industry</option>
              {["Information Technology", "Healthcare", "Education", "Finance", "Retail", "Manufacturing", "Construction", "Transportation", "Agriculture", "Hospitality"].map((industryOption) => (
                <option key={industryOption} value={industryOption}>{industryOption}</option>
              ))}
            </select>
            {errors.industry && <p className="text-red-500">{errors.industry}</p>}

            <p className="font-medium">What's your occupation?</p>
            <p className="mb-3">Please select the closest option to your occupation.</p>
            <select
              className="border-gray-300 border-2 rounded-lg p-2 mb-6 mr-1 w-1/3"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            >
              <option value="">Select your occupation</option>
              {["Software Engineer", "Systems Administrator","Nurse", "Physician","Teacher", "Professor","Accountant", "Financial Analyst","Sales Associate", "Store Manager","Production Worker", "Quality Control Inspector","Carpenter", "Project Manager","Truck Driver", "Pilot","Farmer", "Agronomist","Hotel Manager", "Chef"].map((occupationOption) => (
                <option key={occupationOption} value={occupationOption}>{occupationOption}</option>
              ))}
            </select>
            {errors.occupation && <p className="text-red-500">{errors.occupation}</p>}

            <p className="font-medium">What's your annual salary?</p>
            <p className="mb-3">This includes your salary, bonus, incentives or other compensation you may receive.</p>
            <div className="flex flex-row justify-evenly w-full mb-4">
              {["£0-£24,999","£25,000-£49,999","£50,000-£99,000","£100,000-£149,999", "£150,000+"].map((range) => (
                <button
                  key={range}
                  type="button"
                  className={`border-2 rounded-lg py-4 px-2 mx-0.5 my-2 w-1/5 text-sm hover:bg-blue-100 hover:border-blue-700 ${
                    selectedRange === range ? "bg-blue-100 border-blue-700" : "border-gray-300"
                  }`}
                  onClick={() => handleSalaryClick(range)}
                >
                  {range}
                </button>
              ))}
            </div>
            {errors.selectedRange && <p className="text-red-500">{errors.selectedRange}</p>}
          </div>
        );
      
      case "Part-time employed":
        return (
          <div className="flex flex-col items-start w-full">
            <p className="font-medium">What industry do you work in?</p>
            <p className="mb-3">Please select the closest option to your industry.</p>
            <select
              className="border-gray-300 border-2 rounded-lg p-2 mb-6 mr-1 w-1/3"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              <option value="">Select your industry</option>
              {["Information Technology", "Healthcare", "Education", "Finance", "Retail", "Manufacturing", "Construction", "Transportation", "Agriculture", "Hospitality"].map((industryOption) => (
                <option key={industryOption} value={industryOption}>{industryOption}</option>
              ))}
            </select>
            {errors.industry && <p className="text-red-500">{errors.industry}</p>}

            <p className="font-medium">What's your occupation?</p>
            <p className="mb-3">Please select the closest option to your occupation.</p>
            <select
              className="border-gray-300 border-2 rounded-lg p-2 mb-6 mr-1 w-1/3"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            >
              <option value="">Select your occupation</option>
              {["Software Engineer", "Systems Administrator","Nurse", "Physician","Teacher", "Professor","Accountant", "Financial Analyst","Sales Associate", "Store Manager","Production Worker", "Quality Control Inspector","Carpenter", "Project Manager","Truck Driver", "Pilot","Farmer", "Agronomist","Hotel Manager", "Chef"].map((occupationOption) => (
                <option key={occupationOption} value={occupationOption}>{occupationOption}</option>
              ))}
            </select>
            {errors.occupation && <p className="text-red-500">{errors.occupation}</p>}

            <p className="font-medium">What's your annual income?</p>
            <p className="mb-3">You can give an approximate number according to your wages.</p>
            <div className="flex flex-row justify-evenly w-full mb-4">
              {["£0-£24,999","£25,000-£49,999","£50,000-£99,000","£100,000-£149,999", "£150,000+"].map((range) => (
                <button
                  key={range}
                  type="button"
                  className={`border-2 rounded-lg py-4 px-2 mx-0.5 my-2 w-1/5 text-sm hover:bg-blue-100 hover:border-blue-700 ${
                    selectedRange === range ? "bg-blue-100 border-blue-700" : "border-gray-300"
                  }`}
                  onClick={() => handleSalaryClick(range)}
                >
                  {range}
                </button>
              ))}
            </div>
            {errors.selectedRange && <p className="text-red-500">{errors.selectedRange}</p>}
          </div>
        );

      case "Self-employed":
        return (
          <div className="flex flex-col items-start w-full">
            <p className="font-medium">What industry do you work in?</p>
            <p className="mb-3">Please select the closest option to your industry.</p>
            <select
              className="border-gray-300 border-2 rounded-lg p-2 mb-6 mr-1 w-1/3"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              <option value="">Select your industry</option>
              {["Information Technology", "Healthcare", "Education", "Finance", "Retail", "Manufacturing", "Construction", "Transportation", "Agriculture", "Hospitality"].map((industryOption) => (
                <option key={industryOption} value={industryOption}>{industryOption}</option>
              ))}
            </select>
            {errors.industry && <p className="text-red-500">{errors.industry}</p>}

            <p className="font-medium">What's your occupation?</p>
            <p className="mb-3">Please select the closest option to your occupation.</p>
            <select
              className="border-gray-300 border-2 rounded-lg p-2 mb-6 mr-1 w-1/3"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            >
              <option value="">Select your occupation</option>
              {["Software Engineer", "Systems Administrator","Nurse", "Physician","Teacher", "Professor","Accountant", "Financial Analyst","Sales Associate", "Store Manager","Production Worker", "Quality Control Inspector","Carpenter", "Project Manager","Truck Driver", "Pilot","Farmer", "Agronomist","Hotel Manager", "Chef"].map((occupationOption) => (
                <option key={occupationOption} value={occupationOption}>{occupationOption}</option>
              ))}
            </select>
            {errors.occupation && <p className="text-red-500">{errors.occupation}</p>}

            <p className="font-medium">What's your annual income?</p>
            <p className="mb-3">This includes your salary, benefits, investments or other income you may receive.</p>
            <div className="flex flex-row justify-evenly w-full mb-4">
              {["£0-£24,999","£25,000-£49,999","£50,000-£99,000","£100,000-£149,999", "£150,000+"].map((range) => (
                <button
                  key={range}
                  type="button"
                  className={`border-2 rounded-lg py-4 px-2 mx-0.5 my-2 w-1/5 text-sm hover:bg-blue-100 hover:border-blue-700 ${
                    selectedRange === range ? "bg-blue-100 border-blue-700" : "border-gray-300"
                  }`}
                  onClick={() => handleSalaryClick(range)}
                >
                  {range}
                </button>
              ))}
            </div>
            {errors.selectedRange && <p className="text-red-500">{errors.selectedRange}</p>}
          </div>
        );

      case "Retired":
        return (
          <div className="flex flex-col items-start w-full">
                        <p className="font-medium">What industry did you work in before retirement?</p>
            <p className="mb-3">Please select the closest option to your industry.</p>
            <select
              className="border-gray-300 border-2 rounded-lg p-2 mb-6 mr-1 w-1/3"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              <option value="">Select your industry</option>
              {["Information Technology", "Healthcare", "Education", "Finance", "Retail", "Manufacturing", "Construction", "Transportation", "Agriculture", "Hospitality"].map((industryOption) => (
                <option key={industryOption} value={industryOption}>{industryOption}</option>
              ))}
            </select>
            {errors.industry && <p className="text-red-500">{errors.industry}</p>}

            <p className="font-medium">What's your former occupation before retirement?</p>
            <p className="mb-3">Please select the closest option to your occupation.</p>
            <select
              className="border-gray-300 border-2 rounded-lg p-2 mb-6 mr-1 w-1/3"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            >
              <option value="">Select your occupation</option>
              {["Software Engineer", "Systems Administrator","Nurse", "Physician","Teacher", "Professor","Accountant", "Financial Analyst","Sales Associate", "Store Manager","Production Worker", "Quality Control Inspector","Carpenter", "Project Manager","Truck Driver", "Pilot","Farmer", "Agronomist","Hotel Manager", "Chef"].map((occupationOption) => (
                <option key={occupationOption} value={occupationOption}>{occupationOption}</option>
              ))}
            </select>
            {errors.occupation && <p className="text-red-500">{errors.occupation}</p>}

            <p className="font-medium">What's your annual income?</p>
            <p className="mb-3">This includes your pension, investments or retirement benefits you may receive.</p>
            <div className="flex flex-row justify-evenly w-full mb-4">
              {["£0-£24,999","£25,000-£49,999","£50,000-£99,000","£100,000-£149,999", "£150,000+"].map((range) => (
                <button
                  key={range}
                  type="button"
                  className={`border-2 rounded-lg py-4 px-2 mx-0.5 my-2 w-1/5 text-sm hover:bg-blue-100 hover:border-blue-700 ${
                    selectedRange === range ? "bg-blue-100 border-blue-700" : "border-gray-300"
                  }`}
                  onClick={() => handleSalaryClick(range)}
                >
                  {range}
                </button>
              ))}
            </div>
            {errors.selectedRange && <p className="text-red-500">{errors.selectedRange}</p>}
          </div>
        );

      case "Student":
        return (
          <div className="flex flex-col items-start w-full">
                        <p className="font-medium">What is your area of study?</p>
            <p className="mb-3">Please select the closest option to your area of study.</p>
            <select
              className="border-gray-300 border-2 rounded-lg p-2 mb-6 mr-1 w-1/3"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              <option value="">Select your area of study</option>
              {[ "Business Administration","Engineering (Computer,Mechanical, Electrical, Civil, etc.)","Psychology","Medicine","Economics","Literature","Sociology","Political Science","Education"].map((industryOption) => (
                <option key={industryOption} value={industryOption}>{industryOption}</option>
              ))}
            </select>
            {errors.industry && <p className="text-red-500">{errors.industry}</p>}

            <p className="font-medium">What's your level of study?</p>
            <p className="mb-3">Please select the closest option to your level of study.</p>
            <select
              className="border-gray-300 border-2 rounded-lg p-2 mb-6 mr-1 w-1/3"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            >
              <option value="">Select your level of study</option>
              {["High School","Undergraduate", "Postgraduate", "PHD"].map((occupationOption) => (
                <option key={occupationOption} value={occupationOption}>{occupationOption}</option>
              ))}
            </select>
            {errors.occupation && <p className="text-red-500">{errors.occupation}</p>}

            <p className="font-medium">What's your annual income?</p>
            <p className="mb-3">This includes any side job and stipend you may be receiving.</p>
            <div className="flex flex-row justify-evenly w-full mb-4">
              {["£0-£24,999","£25,000-£49,999","£50,000-£99,000","£100,000-£149,999", "£150,000+"].map((range) => (
                <button
                  key={range}
                  type="button"
                  className={`border-2 rounded-lg py-4 px-2 mx-0.5 my-2 w-1/5 text-sm hover:bg-blue-100 hover:border-blue-700 ${
                    selectedRange === range ? "bg-blue-100 border-blue-700" : "border-gray-300"
                  }`}
                  onClick={() => handleSalaryClick(range)}
                >
                  {range}
                </button>
              ))}
            </div>
            {errors.selectedRange && <p className="text-red-500">{errors.selectedRange}</p>}
          </div>
        );

      case "Not in employment":
        return (
          <div className="flex flex-col items-start w-full">
            {/* Not in employment form fields not sure what to put here */}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className='flex flex-col min-h-screen bg-slate-300 items-center justify-center'>
      <FixedTopBar percentage={progress} />
      <div className='flex flex-col w-3/5 items-center justify-center mt-8'>
        <form className="w-full flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col items-start bg-white border border-gray-300 rounded-lg p-4 shadow-md text-center w-full mt-12">
            <p className="mb-4">
              <span className="text-blue-700 font-semibold">07 </span>
              <span className="font-medium">Employment Details </span>
            </p>
            <p className="font-medium">What's your employment status?</p>
            <p className="mb-4">We ask this to improve security on your account.</p>

            <div className="flex flex-row justify-evenly w-full mb-4">
              {["Full-time employed", "Part-time employed", "Self-employed", "Retired", "Student", "Not in employment"].map((status) => (
                <button
                  key={status}
                  type="button"
                  className={`border-2 rounded-lg py-4 px-2 mx-0.5 my-2 w-1/6 text-sm hover:bg-blue-100 hover:border-blue-700 ${
                    selectedEmployment === status ? "bg-blue-100 border-blue-700" : "border-gray-300"
                  }`}
                  onClick={() => handleButtonClick(status)}
                >
                  {status}
                </button>
              ))}
            </div>
            {errors.selectedEmployment && <p className="text-red-500">{errors.selectedEmployment}</p>}
            {renderFormFields()}
          </div>

          <button type="submit" className="bg-blue-600 text-white rounded-lg py-2 px-4 my-2 hover:bg-blue-500 self-end">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default EmploymentDetails;
