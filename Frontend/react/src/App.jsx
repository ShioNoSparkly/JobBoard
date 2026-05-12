import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Jobspage from "./pages/Jobspage";
import Loginpage from "./pages/Loginpage";
import RegisterPage from "./pages/RegisterPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import { useState } from "react";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Jobspage />} />
          <Route path="login" element={<Loginpage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="/jobs/:id" element={<JobDetailsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
