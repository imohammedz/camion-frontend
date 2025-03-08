import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableRow, TableCell, Chip, IconButton, Tooltip } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { Fleet } from "../../interfaces/Fleet";

interface FleetRowProps {
  fleet: Fleet;
}

const FleetRow: React.FC<FleetRowProps> = ({ fleet }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Fully Operational":
        return "success";
      case "Maintenance":
        return "primary";
      case "Partially Operational":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <TableRow
      hover
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TableCell>{fleet.fleet_name}</TableCell>
      <TableCell>{fleet.fleet_base_location}</TableCell>
      <TableCell>
        <Chip
          label={fleet.operational_status}
          color={getStatusColor(fleet.operational_status)}
          variant="outlined"
          sx={{ fontWeight: "bold" , backgroundColor: "lightGreen"}}
        />
      </TableCell>
      <TableCell align="right">
        {isHovered && (
          <Tooltip title="View Details">
            <IconButton
              onClick={() => navigate(`/fleets/${fleet.id}`)}
              size="small"
            >
              <ArrowForward />
            </IconButton>
          </Tooltip>
        )}
      </TableCell>
    </TableRow>
  );
};

export default FleetRow;
