import React from "react";
import "../styles/Header.css"; // Custom styles for the header

const Header: React.FC = () => {
  return (
    <header className="header-container">
      <div className="brand-name">
        Cam<span className="blue-i">i</span>on
      </div>
    </header>
  );
};

export default Header;
