import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ThemeToggleButton from "../ui/themeToggleButton.tsx";
import { fetchUserProfile } from "../../utils/Api.tsx";
import { DarkMode, LightMode } from "@mui/icons-material";

interface HeaderProps {
  toggleTheme: () => void;
  darkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, darkMode }) => {
  const theme = useTheme();
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserName(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        boxShadow: 1,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Empty box to balance the layout */}
        <Box sx={{ width: "33%" }} />

        {/* Centered title */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "red" }}>
            Cam<span style={{ color: theme.palette.text.primary }}>i</span>on
          </Typography>
        </Box>

        {/* Right side: User info, logout, and theme toggle */}
        <Box
          sx={{
            width: "33%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {userName ? (
            <>
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                Welcome, {userName}!
              </Typography>
              <Button
                variant="outlined"
                onClick={handleLogout}
                sx={{ color: theme.palette.text.primary }}
              >
                Logout
              </Button>
            </>
          ) : (
            !excludedPaths.includes(location.pathname) && (
              <Button
                component={Link}
                to="/login"
                sx={{ color: theme.palette.text.primary }}
              >
                Login
              </Button>
            )
          )}
          <Box ml={2}>
            <IconButton onClick={toggleTheme} color="inherit">
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
