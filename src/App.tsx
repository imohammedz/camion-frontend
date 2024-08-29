// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import IntroPage from "./components/IntroPage";
import CreateOrderPage from "./components/CreateOrderPage"; // Import the new page
import CreateFleetPage from "./components/CreateFleetPage";
import CreateAdvertisementPage from "./components/CreateAdvertisementPage";
import FleetManagementPage from "./components/FleetManagementPage";
import AddTrucksPage from "./components/AddTrucksPage";

import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
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
