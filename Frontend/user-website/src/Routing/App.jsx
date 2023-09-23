import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../screens/Authentication/Login";
import Register from "../screens/Authentication/Register";
import Profile from "../screens/Dashboard/Profile";
import ForgetPassword from "../screens/Authentication/ForgetPassword";
import Verify from "../screens/Authentication/Verify";
import { Toaster } from "react-hot-toast";
import GiveExam from "../screens/Dashboard/GiveExam";
import Exam from "../screens/Dashboard/Exam";
import Result from "../screens/Dashboard/Results";
import Report from "../screens/Dashboard/Report";
import ResetPassword from "../screens/Dashboard/ResetPassword";
import Instructions from "../screens/Dashboard/Checking/Instructions";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Exam />} />
        <Route path="/dashboard/exam/:id" element={<GiveExam />} />
        <Route path="/dashboard/results/" element={<Result />} />
        <Route path="/dashboard/report-problem" element={<Report />} />
        <Route path="/dashboard/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard/instructions" element={<Instructions />} />
      </Routes>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
};

export default App;
