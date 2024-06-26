import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div >
      <div className="bg-blue-300 py-10 px-4 flex flex-col md:flex-row items-stretch h-2/5 ">
        <div className="w-full md:w-4/5">
          <div className=" mt-5 sm:mt-16 lg:pl-64">
            <p className="text-4xl md:text-7xl text-center md:text-left font-semibold">
              BANK NAME
            </p>
            <p className="text-xs md:text-base text-center md:text-left">
              Full Form of Bank
            </p>
          </div>
        </div>
        <div className="bg-blue-950 w-full md:w-64 rounded-md mt-8 md:mt-0 md:ml-4">
          <form className="px-4 md:px-8 py-4">
            <input
              type="text"
              className="border-2 mt-2 md:mt-8 h-8 rounded-md pl-1 w-full"
              placeholder="UserID"
            />
            <br />
            <p className="mb-2 ml-2 md:ml-8 text-white text-xs hover:underline hover:cursor-pointer">
              Forgot UserID
            </p>
            <input
              type="text"
              className="border-2 mt-2 h-8 rounded-md pl-1 w-full"
              placeholder="Password"
            />
            <br />
            <p className="mb-5 ml-2 md:ml-8 text-white text-xs hover:underline hover:cursor-pointer">
              Forgot Password
            </p>
            <div className="flex justify-center">
            <button className="border-2 w-64 flex justify-center px- md:mx-8 mb-3 h-7 rounded-xl bg-blue-400  md:w-32">
              Log In
            </button>
            </div>
            <p className="text-white mx-2 md:mx-8 text-xs text-center md:text-left">
              Don't have an account?
            </p>
            <div className="flex justify-center">

            <button
              className="border-2 w-64 flex justify-center px- md:mx-8 mb-3 h-7 rounded-xl bg-blue-400  md:w-32"
              onClick={() => navigate("/signup")}
              >
              Sign Up
            </button>
              </div>
          </form>
        </div>
      </div>
      <div className="bg-blue-300 pb-4 px-4">
        <div className="pt-6">
          <p className="text-3xl md:text-4xl font-semibold text-center">
            Banking at your fingertips
          </p>
        </div>
        <div>
          <p className="text-center">
            Experience the efficiency of banking with |Bank Name| Internet
            Banking
          </p>
        </div>
        <div className="pt-1">
          <p className="text-center underline font-bold text-lg lg:mt-10">
            Getting Started
          </p>
          <p className="text-center px-8 sm:px-10">
            We provide easy steps to start online banking. Assistance is
            available 24/7 for customers. Avail a variety of benefits and
            services through the online banking service. Hassle-free internet
            banking options make banking with us the best.
          </p>
        </div>
        <div className="bg-blue-800 mx-2 md:mx-16 my-10 rounded-md shadow-md py-3 lg:h-64">
          <p className="text-xl font-bold underline text-center lg:mt-8 lg:mb-3">
            Key Features and Benefits
          </p>
          <div className="flex flex-wrap items-stretch">
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 py-4">
              <p className="text-center text-lg font-medium">
                1) Apply for credit/debit card
              </p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 py-4">
              <p className="text-center text-lg font-medium">
                2) Check your balance
              </p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 py-4">
              <p className="text-center text-lg font-medium">
                3) Get your bank account statement
              </p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 py-4">
              <p className="text-center text-lg font-medium">
                4) Transfer funds through NEFT, RTGS, IMPS or UPI
              </p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 py-4">
              <p className="text-center text-lg font-medium">
                5) 24x7 service
              </p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 py-4">
              <p className="text-center text-lg font-medium">
                6) Pay your credit cards bill
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
