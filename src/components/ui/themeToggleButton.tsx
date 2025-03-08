"use client";

import { IconButton } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import { useTheme } from "./themeProvider";

export default function ThemeToggleButton() {
  const { mode, toggleTheme } = useTheme();

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {mode === "light" ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
}
