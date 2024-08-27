// src/components/IntroPage.tsx
import React from 'react';
import './IntroPage.css';

interface IntroPageProps {
  currentTheme: string;
}

const IntroPage: React.FC<IntroPageProps> = ({ currentTheme }) => {
  return (
    <div className={`intro-container ${currentTheme}`}>
      <h1 className="welcome-title">Welcome to Camion</h1>
      <p className="intro-text">Select an option to continue</p>
      <div className="options-container">
        <div className="option-card">Option 1</div>
        <div className="option-card">Option 2</div>
        <div className="option-card">Option 3</div>
      </div>
    </div>
  );
};

export default IntroPage;
