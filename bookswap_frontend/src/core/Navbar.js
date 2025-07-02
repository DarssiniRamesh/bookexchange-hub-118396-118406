import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// PUBLIC_INTERFACE
function Navbar({ onToggleTheme, currentTheme }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar" style={{
      background: "var(--bg-secondary)",
      padding: "1rem 2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <Link to="/" className="title" style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: 24, textDecoration: "none" }}>
        BookSwap Hub
      </Link>
      <div className="nav-links" style={{ display: 'flex', gap: '1.5rem', alignItems: "center" }}>
        {user && (
          <>
            <Link to="/marketplace">Marketplace</Link>
            <Link to="/list-book">List a Book</Link>
            <Link to="/swap-requests">Swap Requests</Link>
            <Link to="/purchases">Purchases</Link>
            <Link to="/dashboard">Dashboard</Link>
            <span style={{ marginLeft: 20 }}>Hi, <strong>{user.username}</strong></span>
            <button className="btn" onClick={handleLogout}>Logout</button>
          </>
        )}
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
          style={{ marginLeft: 16 }}
        >
          {currentTheme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
