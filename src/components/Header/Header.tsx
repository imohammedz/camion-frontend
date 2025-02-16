import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css"; // Importing CSS Modules
import { fetchUserProfile } from "../../utils/Api.tsx";

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

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setUserName(null); // Clear user state
  };

  return (
    <header className={styles.header}>
      <div className={styles["brand-container"]}>
        <Link to="/" className={styles["brand-name"]}>
          Cam<span className={styles["brand-highlight"]}>i</span>on
        </Link>
      </div>
      <div className={styles["header-right"]}>
        {userName ? (
          <>
            <span className={styles["welcome-text"]}>Welcome, {userName}!</span>
            <button
              onClick={handleLogout}
              className={styles["logout-button"]}
              aria-label="Logout"
            >
              Logout
            </button>
          </>
        ) : (
          !excludedPaths.includes(location.pathname) && (
            <Link to="/login">
              <button className={styles["login-button"]} aria-label="Login">
                Login
              </button>
            </Link>
          )
        )}
        <div className={styles["theme-toggle-wrapper"]}>
          <input
            type="checkbox"
            id="theme-toggle"
            className={styles["theme-toggle"]}
            onChange={toggleTheme}
            checked={currentTheme === "dark"}
            aria-label="Toggle Theme"
          />
          <label
            htmlFor="theme-toggle"
            className={styles["theme-toggle-label"]}
          >
            <span className={styles["theme-toggle-ball"]}></span>
          </label>
        </div>
      </div>
    </header>
  );
};

export default Header;
