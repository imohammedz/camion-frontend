import React from "react";
import "../styles/Header.css"; // Custom styles for the header

const Header: React.FC = () => {
  return (
    <header className="header-container">
      <a href="http://localhost:5173" className="brand-link">
        <div className="brand-name">
          Cam<span className="blue-i">i</span>on
        </div>
      </a>
    </header>
  );
};

export default Header;
