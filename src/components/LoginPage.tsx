// src/components/LoginPage.tsx
import React, { useState } from "react";
import axios from "axios";
import "../styles/LoginPage.css"; // Add your styles here
import { Link } from "react-router-dom"; // Import Link for routing

const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          identifier,
          password,
        }
      );
      localStorage.setItem("token", response.data.token); // Save JWT token in local storage
      // Redirect to a protected route or dashboard
      window.location.href = "/";
    } catch (err: any) {
      setError(err.response.data.msg || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="identifier">Email or Phone Number</label>
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Link to="/signup" className="header-link">
          <span>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Signup
            </button>
          </span>
        </Link>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
