// src/components/Header.tsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation
import "../styles/Header.css";
import { fetchUserProfile } from "../utils/Api.tsx";

interface HeaderProps {
  toggleTheme: () => void;
  currentTheme: string;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, currentTheme }) => {
  const location = useLocation(); // Get the current location
  const excludedPaths = ["/login", "/signup"]; // Paths where the Login button should not be shown
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const getUserProfile = async () => {
      const profile = await fetchUserProfile(); // Await the profile fetch
      if (profile) {
        setUserName(profile.name); // Set the user's name
      }
    };

    getUserProfile(); // Call the function to fetch user profile
  }, []);

  return (
    <header className="header-container flex justify-between items-center p-4 bg-white shadow">
      <div className="brand-name">
        {/* Wrap the brand name in a Link component */}
        <Link to="/" className="header-link text-2xl font-bold text-red-600">
          Cam<span className="text-blue-600">i</span>on
        </Link>
      </div>
      <div className="header-actions flex items-center space-x-4">
        {userName ? (
          <span className="text-lg font-medium text-gray-700">
            Welcome, {userName}!
          </span>
        ) : (
          !excludedPaths.includes(location.pathname) && (
            <Link to="/login" className="header-link">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5"
              >
                Login
              </button>
            </Link>
          )
        )}
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
      </div>
    </header>
  );
};

export default Header;
