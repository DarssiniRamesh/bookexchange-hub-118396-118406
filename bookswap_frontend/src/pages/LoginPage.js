import React, { useState } from "react";
import { useAuth } from "../core/AuthContext";
import { useNavigate, Link } from "react-router-dom";

// PUBLIC_INTERFACE
function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const ok = await login(username, password);
    if (ok) navigate("/marketplace");
    else setError("Invalid credentials");
  };

  return (
    <div style={{ maxWidth: 340, margin: "50px auto", background: "var(--bg-secondary)", padding: 30, borderRadius: 12 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input value={username} onChange={e => setUsername(e.target.value)} required placeholder="Username" autoFocus style={{ width: "100%", marginBottom: 12 }} />
        </div>
        <div>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" style={{ width: "100%", marginBottom: 18 }} />
        </div>
        <button className="btn btn-large" style={{ width: "100%" }} type="submit">Login</button>
        {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}
      </form>
      <p style={{ marginTop: 18 }}>
        New user? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
export default LoginPage;
