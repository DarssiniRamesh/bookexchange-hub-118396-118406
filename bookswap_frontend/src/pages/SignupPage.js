import React, { useState } from "react";
import { useAuth } from "../core/AuthContext";
import { useNavigate, Link } from "react-router-dom";

// PUBLIC_INTERFACE
function SignupPage() {
  const { signup } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (password !== password2) {
      setError("Passwords do not match.");
      return;
    }
    const ok = await signup(username, password);
    if (ok) navigate("/marketplace");
    else setError("Signup failed (possibly taken username)");
  };

  return (
    <div style={{ maxWidth: 340, margin: "50px auto", background: "var(--bg-secondary)", padding: 30, borderRadius: 12 }}>
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input value={username} onChange={e => setUsername(e.target.value)} required placeholder="Username" autoFocus style={{ width: "100%", marginBottom: 12 }} />
        </div>
        <div>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" style={{ width: "100%", marginBottom: 12 }} />
        </div>
        <div>
          <input type="password" value={password2} onChange={e => setPassword2(e.target.value)} required placeholder="Repeat password" style={{ width: "100%", marginBottom: 18 }} />
        </div>
        <button className="btn btn-large" type="submit" style={{ width: "100%" }}>Register</button>
        {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}
      </form>
      <p style={{ marginTop: 18 }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
export default SignupPage;
