import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Header from "./components/Header/Header";
import GetStarted from "./components/getStarted/started";
import IntroPage from "./components/IntroPage/IntroPage";
import CreateOrderPage from "./components/CreateOrderPage";
import CreateFleetPage from "./components/CreateFleetPage";
import CreateAdvertisementPage from "./components/CreateAdvertisementPage";
import FleetManagementPage from "./components/FleetManagement/FleetManagementPage";
import AddTrucksPage from "./components/AddTrucks/AddTrucksPage";
import FleetDetailDashBoard from "./components/FleetDetail/FleetDetailsPage";
import UpdateFleetPage from "./components/UpdateFleetPage";
import LoginPage from "./components/LoginPage/LoginPage";
import SignupPage from "./components/SignupPage/SignupPage";
import TruckDetailPage from "./components/TruckDetailPage";
import EditTruckPage from "./components/EditTruckPage";
import Dashboard from "./components/FleetDetail/FleetDetailsPage";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );

  // Create a theme based on the state
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  // Toggle function for the theme
  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* Header with Theme Toggle inside */}
        <Header toggleTheme={toggleTheme} darkMode={darkMode} />
        
        <Routes>
          <Route path="/" element={<GetStarted />} />
          <Route path="/intro" element={<IntroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/create-order" element={<CreateOrderPage />} />
          <Route path="/fleet-management" element={<FleetManagementPage />} />
          <Route path="/fleets/:fleetId" element={<FleetDetailDashBoard />} />
          <Route path="/create-fleet" element={<CreateFleetPage />} />
          <Route path="/fleets/:fleetId/edit" element={<UpdateFleetPage />} />
          <Route path="/fleets/:fleetId/add-trucks" element={<AddTrucksPage />} />
          <Route path="/trucks/:truckId" element={<TruckDetailPage />} />
          <Route path="/trucks/:truckId/edit" element={<EditTruckPage />} />
          <Route path="/create-advertisement" element={<CreateAdvertisementPage />} />
          <Route path="/dashboard/:fleetId" element={<Dashboard />} />
          </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
