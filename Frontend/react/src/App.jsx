import { Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout'
import Hero from './components/Hero'
import Jobspage from './pages/Jobspage'
import Loginpage from './pages/Loginpage'
import RegisterPage from './pages/RegisterPage'
import JobDetailsPage from './pages/JobDetailsPage'
import CompanyPage from './pages/CompanyPage'
import UserPage from './pages/UserPage'
import PrivacyPage from './pages/PrivacyPage'
import TerminiPage from './pages/TerminiPage'
import CookiePage from './pages/CookiePage'
import ComeCandidarsiPage from './pages/ComeCandidarsiPage'
import TempiSelezione from './pages/TempiSelezionePage'
import ProtectedRoute from './components/ProtectedRoutes';
import CaricaCvPage from "./pages/CaricaCVPage";
import ChiSiamoPage from './pages/ChiSiamoPage';

import { useState } from 'react'

import "./App.css";

function App() {

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<MainLayout />}>

            <Route path="/company" element={<ProtectedRoute requiredRole="azienda"><CompanyPage /></ProtectedRoute>} />
            <Route path="/user" element={<ProtectedRoute requiredRole="candidato"><UserPage /></ProtectedRoute>} />

            
            <Route index element={<Jobspage />} />
            <Route path="/jobs/:id" element={<JobDetailsPage />} />
            <Route path='login' element={<Loginpage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/termini" element={<TerminiPage />} />
            <Route path="/cookie" element={<CookiePage />} />
            <Route path="/come-candidarsi" element={<ComeCandidarsiPage />} />
            <Route path="/tempi-selezione" element={<TempiSelezione />} />
            <Route path="/carica-cv" element={<CaricaCvPage />} />
            <Route path="/chi-siamo" element={<ChiSiamoPage />} />






          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
