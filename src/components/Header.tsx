// src/components/Header.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation
import "../styles/Header.css";

interface HeaderProps {
  toggleTheme: () => void;
  currentTheme: string;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, currentTheme }) => {
  const location = useLocation(); // Get the current location
  // Define an array of paths where the Login button should not be shown
  const excludedPaths = ["/login", "/signup"]; // Add more paths as needed
  return (
    <header className="header-container">
      <div className="brand-name">
        {/* Wrap the brand name in a Link component */}
        <Link to="/" className="header-link">
          Cam<span className="blue-i">i</span>on
        </Link>
      </div>
      <div className="header-actions">
        {/* Only show the Login button if the current path is not in excludedPaths */}
        {!excludedPaths.includes(location.pathname) && (
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
        )}
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
