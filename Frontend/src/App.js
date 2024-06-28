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
import Authentication from "./pages/Authentication";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/authentication" element={<Authentication/>}/>      
      </Routes>
    </Router>
>>>>>>> Stashed changes
  );
};

export default App;
