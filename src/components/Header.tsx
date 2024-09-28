// src/components/Header.tsx
import React from "react";
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
          <span>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Login
            </button>
          </span>
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
