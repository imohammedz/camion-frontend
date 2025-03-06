// src/App.tsx
import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import IntroPage from "./components/IntroPage/IntroPage";
import CreateOrderPage from "./components/CreateOrderPage";
import CreateFleetPage from "./components/CreateFleetPage";
import CreateAdvertisementPage from "./components/CreateAdvertisementPage";
import FleetManagementPage from "./components/FleetManagement/FleetManagementPage";
import AddTrucksPage from "./components/AddTrucks/AddTrucksPage";
import FleetDetailPage from "./components/FleetDetail/FleetDetailPage"; // Import the new FleetDetailPage
import UpdateFleetPage from "./components/UpdateFleetPage";
import LoginPage from "./components/LoginPage/LoginPage"; // Import the LoginPage component
import SignupPage from "./components/SignupPage/SignupPage"; // Import the SignupPage component
import TruckDetailPage from "./components/TruckDetailPage";
import EditTruckPage from "./components/EditTruckPage";
import GetStarted from "./components/getStarted/started";

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
        <Route path="/" element={<GetStarted />} />
        <Route path="/intro" element={<IntroPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/create-order" element={<CreateOrderPage />} />
        <Route path="/fleet-management" element={<FleetManagementPage />} />
        <Route path="/fleets/:fleetId" element={<FleetDetailPage />} />
        <Route path="/create-fleet" element={<CreateFleetPage />} />
        <Route path="/fleets/:fleetId/edit" element={<UpdateFleetPage />} />
        <Route path="/fleets/:fleetId/add-trucks" element={<AddTrucksPage />} />
        <Route path="/trucks/:truckId" element={<TruckDetailPage />} />
        <Route path="/trucks/:truckId/edit" element={<EditTruckPage />} />
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
