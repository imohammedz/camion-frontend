import React, { useState } from "react";
import axios from "axios";
import styles from "./LoginPage.module.css"; // Import styles
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

      // Save JWT token and role in local storage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      // Redirect to a protected route or dashboard
      window.location.href = "/";
    } catch (err: any) {
      setError(err.response.data.msg || "Login failed");
    }
  };

  return (
    <div className={styles.loginContainer}>
      {" "}
      <div className={styles.text}>
        <h2>Login</h2>
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}{" "}
      {/* Apply class from CSS module */}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          {" "}
          {/* Apply class from CSS module */}
          <label htmlFor="identifier">Email or Phone Number</label>
          <input
            className="style.text-input"
            type="text"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          {" "}
          {/* Apply class from CSS module */}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
          <Link to="/signup" className={styles.headerLink}>
            {" "}
            {/* Apply headerLink class from CSS module */}
            <button type="button" className={styles.signupButton}>
              Signup
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
