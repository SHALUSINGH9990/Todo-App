import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await api.login({ email, password });
      login(data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="app-root">
      <div className="container center-card card">
        <h2 style={{ marginTop: 0 }}>Welcome back</h2>
        <p style={{ marginTop: 0, color: "var(--muted)" }}>Sign in to manage your tasks</p>

        <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {error && <div style={{ color: "#c53030", marginBottom: 8 }}>{error}</div>}

          <div className="buttons">
            <button type="submit" className="btn btn-primary">Login</button>
            <Link to="/register" className="btn btn-ghost" style={{ display: "inline-flex", alignItems: "center", height: "36px", padding: "0 0.75rem" }}>Register</Link>
          </div>
        </form>

        <div style={{ marginTop: 12, fontSize: 14, color: "var(--muted)" }}>
          By continuing you agree to the app terms.
        </div>
      </div>
    </div>
  );
}
