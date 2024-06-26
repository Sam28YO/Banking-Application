import React from "react";

import Personal_Details from "./pages/Forms/Personal Details.js";
import EmploymentDetails from "./pages/Forms/EmploymentDetails.js";
import Home from "./pages/home.js";
import SignUp from "./pages/signup";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/personalDetails" element={<Personal_Details />} />
      <Route path="/employmentDetails" element={<EmploymentDetails />} />
      </Routes>
    </Router>
  );
};

export default App;