import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './core/AuthContext';
import Navbar from './core/Navbar';

// Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MarketplacePage from './pages/MarketplacePage';
import BookDetailPage from './pages/BookDetailPage';
import SwapRequestsPage from './pages/SwapRequestsPage';
import PurchasesPage from './pages/PurchasesPage';
import DashboardPage from './pages/DashboardPage';
import ListBookPage from './pages/ListBookPage';
import NotFoundPage from './pages/NotFoundPage';

// PUBLIC_INTERFACE
function ProtectedRoute() {
  const { user } = useAuth();
  // Simple route guard for authenticated user
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar onToggleTheme={toggleTheme} currentTheme={theme} />
          <div className="container" style={{ marginTop: 40, minHeight: 500 }}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<MarketplacePage />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/book/:id" element={<BookDetailPage />} />
                <Route path="/swap-requests" element={<SwapRequestsPage />} />
                <Route path="/purchases" element={<PurchasesPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/list-book" element={<ListBookPage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
