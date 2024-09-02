// src/components/Header.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Import Link for routing
import "../styles/Header.css";

interface HeaderProps {
  toggleTheme: () => void;
  currentTheme: string;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, currentTheme }) => {
  return (
    <header className="header-container">
      <div className="brand-name">
        Cam<span className="blue-i">i</span>on
      </div>
      <div className="header-actions">
        <Link to="/login" className="header-link">
          <FontAwesomeIcon icon={faSignInAlt} />
          <span>Login</span>
        </Link>
        <Link to="/signup" className="header-link">
          <FontAwesomeIcon icon={faUser} />
          <span>Sign Up</span>
        </Link>
      </div>
      <div className="theme-toggle-wrapper">
        <input
          type="checkbox"
          id="theme-toggle"
          className="theme-toggle"
          onChange={toggleTheme}
          checked={currentTheme === "dark"}
        />
        <label htmlFor="theme-toggle" className="theme-toggle-label">
          <span className="theme-toggle-ball"></span>
        </label>
      </div>
    </header>
  );
};

export default Header;
