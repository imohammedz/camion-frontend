// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import IntroPage from "./components/IntroPage";
import CreateOrderPage from "./components/CreateOrderPage"; // Import the new page
import CreateFleetPage from "./components/CreateFleetPage";

import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/create-order" element={<CreateOrderPage />} />
        <Route path="/create-fleet" element={<CreateFleetPage />} />
      </Routes>
    </Router>
  );
};

export default App;
