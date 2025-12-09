import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import TaskList from "./TaskList";

export default function Dashboard() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Dashboard</h2>
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <TaskList token={token} />
    </div>
  );
}
