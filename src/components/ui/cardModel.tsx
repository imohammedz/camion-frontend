import React from "react";
import { Card, CardContent, Typography, Button, CardActions, Box } from "@mui/material";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BuildIcon from "@mui/icons-material/Build";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const CardModel = ({ title, value, subtitle, color }) => {
  // Function to determine which icon to display based on the title
  const getIcon = () => {
    switch (title) {
      case "Total Trucks":
        return <DirectionsBusIcon sx={{ fontSize: 24, color: "gray" }} />;
      case "Active Trucks":
        return <CheckCircleIcon sx={{ fontSize: 24, color: "green" }} />;
      case "In Maintenance":
        return <BuildIcon sx={{ fontSize: 24, color: "orange" }} />;
      case "Idle Trucks":
        return <AccessTimeIcon sx={{ fontSize: 24, color: "gray" }} />;
      default:
        return null;
    }
  };

  return (
    <Card
      sx={{
        p: 2,
        textAlign: "left",
        minWidth: 275,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 18 }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ color, fontWeight: "bold", my: 1 }}>
          {value}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          {getIcon()}
          <Typography sx={{ color: "text.secondary", ml: 1 }}>{subtitle}</Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default CardModel;