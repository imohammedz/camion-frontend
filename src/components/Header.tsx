// src/components/Header.tsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Header.css";
import { fetchUserProfile } from "../utils/Api.tsx";

interface HeaderProps {
  toggleTheme: () => void;
  currentTheme: string;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, currentTheme }) => {
  const location = useLocation();
  const excludedPaths = ["/login", "/signup"];
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const getUserProfile = async () => {
      const profile = await fetchUserProfile();
      if (profile) {
        setUserName(profile.name);
      }
    };
    getUserProfile();
  }, []);

  return (
    <header className="header flex justify-between items-center p-4 bg-white shadow">
      <div className="brand-container absolute left-1/2 transform -translate-x-1/2">
        <Link to="/" className="brand-name">
          Cam<span className="text-blue-600">i</span>on
        </Link>
      </div>
      <div className="header-right flex items-center space-x-4 ml-auto">
        {userName ? (
          <span className="text-lg font-medium text-gray-700">
            Welcome, {userName}!
          </span>
        ) : (
          !excludedPaths.includes(location.pathname) && (
            <Link to="/login">
              <button className="btn-primary">Login</button>
            </Link>
          )
        )}
        <div>
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
