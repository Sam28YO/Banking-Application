import React from "react";

import Personal_Details from "./pages/Forms/Personal Details.js";
import EmploymentDetails from "./pages/Forms/EmploymentDetails.js";
import Home from "./pages/home.js";
import SignUp from "./pages/signup";
import PrivacySecurity from "./pages/PrivacySecurity.js";
import ChangePasswordForm from "./pages/Forms/ChangePassword.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/personalDetails" element={<Personal_Details />} />
      <Route path="/employmentDetails" element={<EmploymentDetails />} />
      <Route path="/privacySecurity" element={<PrivacySecurity />} />
      <Route path="/changePassword" element={<ChangePasswordForm />} />
      </Routes>
    </Router>
  );
};

export default App;