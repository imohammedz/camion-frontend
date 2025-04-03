import React from "react";
import { Modal, Box, Typography, Button, Tab, Tabs } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface AccessModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  darkMode?: boolean;
}

const AccessModal: React.FC<AccessModalProps> = ({
  open,
  onClose,
  title,
  description,
  darkMode = false,
}) => {
  const navigate = useNavigate();
  const [tab, setTab] = React.useState(0);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: darkMode ? "#333" : "white",
          color: darkMode ? "white" : "black",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
          width: 400,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ mb: 1, color: darkMode ? "white" : "black" }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 2, color: darkMode ? "lightgray" : "black" }}
        >
          {description}
        </Typography>

        <Tabs
          value={tab}
          onChange={(_, newValue) => setTab(newValue)}
          centered
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: darkMode ? "white" : "black",
            },
            "& .MuiTab-root": {
              fontWeight: "bold",
              color: darkMode ? "lightgray" : "gray",
              "&.Mui-selected": { color: darkMode ? "white" : "black" },
            },
          }}
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: darkMode ? "white" : "black",
            color: darkMode ? "black" : "white",
          }}
          onClick={() => navigate(tab === 0 ? "/login" : "/signup")}
        >
          {tab === 0 ? "Login" : "Sign Up"}
        </Button>
      </Box>
    </Modal>
  );
};

export default AccessModal;
