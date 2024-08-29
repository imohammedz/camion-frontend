// src/App.tsx
import React, { useEffect, useState } from "react";
import "./App.css";
import "./styles/IntroPage.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import IntroPage from "./components/IntroPage";
import CreateOrderPage from "./components/CreateOrderPage";
import CreateFleetPage from "./components/CreateFleetPage";
import CreateAdvertisementPage from "./components/CreateAdvertisementPage";
import FleetManagementPage from "./components/FleetManagementPage";
import AddTrucksPage from "./components/AddTrucksPage";

const App: React.FC = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <Header toggleTheme={toggleTheme} currentTheme={theme} />
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/create-order" element={<CreateOrderPage />} />
        <Route path="/fleet-management" element={<FleetManagementPage />} />
        <Route path="/create-fleet" element={<CreateFleetPage />} />
        <Route path="/fleets/:fleetId/add-trucks" element={<AddTrucksPage />} />
        <Route
          path="/create-advertisement"
          element={<CreateAdvertisementPage />}
        />
        {/* Other routes */}
      </Routes>
    </Router>
  );
};

export default App;
