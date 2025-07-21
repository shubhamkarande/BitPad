import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BitProvider } from './contexts/BitContext';
import Navbar from './components/layout/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import EditorPage from './pages/EditorPage';
import ExplorePage from './pages/ExplorePage';
import BitDetailPage from './pages/BitDetailPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <BitProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/editor" element={<EditorPage />} />
              <Route path="/editor/:id" element={<EditorPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/bit/:id" element={<BitDetailPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </BitProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;