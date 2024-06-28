import React from "react";
<<<<<<< Updated upstream

const App = () => {
  return (
    <div>
      <h1>MERN Stack Template</h1>
    </div>
=======
import Home from "./pages/home";
import SignUp from "./pages/signup";
import Loqate from "./pages/Loqate";
import IdentityVerification from "./pages/IdentityVerification";
import NationalityTaxForm from "./pages/NationalityTaxForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/Loqate" element={<Loqate/>} />
      <Route exact path="/Identity" element={<IdentityVerification />} />
      <Route exact path="/NationalityTax" element={<NationalityTaxForm />} />
      
      </Routes>
    </Router>
>>>>>>> Stashed changes
  );
};

export default App;
