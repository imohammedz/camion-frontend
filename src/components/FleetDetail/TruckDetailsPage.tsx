import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { Visibility, Edit } from "@mui/icons-material";
import axios from "axios";
import { Truck } from "../../interfaces/Truck";
import AddTrucksModal from "./../AddTrucks/AddTruckModel";
import { TruckStatus } from "../../../public/enums/TruckStatus";
import UpdateTruckModal from "../AddTrucks/UpdateTruckModel";

// Status to color mapping with semantic colors for each status
const statusColors: Record<
  string,
  "success" | "warning" | "error" | "info" | "primary" | "secondary" | "default"
> = {
  [TruckStatus.AVAILABLE]: "success",
  [TruckStatus.UNDER_MAINTENANCE]: "warning",
  [TruckStatus.OUT_OF_SERVICE]: "error",
  [TruckStatus.IN_TRANSIT]: "primary",
  [TruckStatus.LOADING]: "info",
  [TruckStatus.UNLOADING]: "info",
  [TruckStatus.WAITING_FOR_ASSIGNMENT]: "secondary",
  [TruckStatus.ON_SALE]: "warning",
  [TruckStatus.IDLE]: "default",
  Active: "success",
  Maintenance: "warning",
  Idle: "default",
};

const statusLabels: Record<string, string> = {
  [TruckStatus.AVAILABLE]: "Available",
  [TruckStatus.UNDER_MAINTENANCE]: "Maintenance",
  [TruckStatus.OUT_OF_SERVICE]: "Out of Service",
  [TruckStatus.IN_TRANSIT]: "In Transit",
  [TruckStatus.LOADING]: "Loading",
  [TruckStatus.UNLOADING]: "Unloading",
  [TruckStatus.WAITING_FOR_ASSIGNMENT]: "Awaiting Assignment",
  [TruckStatus.IDLE]: "Idle",
  [TruckStatus.ON_SALE]: "On Sale",
};

interface FleetTrucksTableProps {
  fleetId?: string;
}

const FleetTrucksTable: React.FC<FleetTrucksTableProps> = ({ fleetId }) => {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isUpdateTruckOpen, setIsUpdateTruckOpen] = useState<boolean>(false);
  const [truckId, setTruckId] = useState<string>("");
  const handleViewTrucks = async (id: string | undefined) => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/fleets/${id}/trucks`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setTrucks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching trucks:", error);
      setError("Failed to fetch trucks.");
      setLoading(false);
    }
  };


//   const handleUpdateTruckClose = () => {
    
//   }

  useEffect(() => {
    handleViewTrucks(fleetId);
  }, [fleetId]);

  const handleAddTruck = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
  };

  const handleTruckAdded = () => {
    handleViewTrucks(fleetId);
  };

  // Function to get a readable status label
  const getStatusLabel = (status: string): string => {
    return statusLabels[status] || status;
  };

  const handleUpdateTruckOpen = (truckId: string) => {
    setIsUpdateTruckOpen(true);
    setTruckId(truckId);
  };
  const handleUpdateTruckClose = () => {
    setIsUpdateTruckOpen(false);
  };

  return (
    <div className="container y-20">
      <Typography variant="h6" mt={3}>
        Fleet Trucks
      </Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={handleAddTruck}>
          + Add Truck
        </Button>
      </Box>

      {loading ? (
        <Typography>Loading trucks...</Typography>
      ) : error ? (
        <Box mb={2}>
          <Typography color="error">{error}</Typography>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Mileage</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trucks && trucks.length > 0 ? (
                trucks.map((truck) => (
                  <TableRow key={truck.registration_number}>
                    <TableCell>{truck.registration_number}</TableCell>
                    <TableCell>{truck.truck_model}</TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusLabel(truck.status)}
                        color={statusColors[truck.status] || "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{truck.capacity}</TableCell>
                    <TableCell>{truck.mileage}</TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <Visibility fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleUpdateTruckOpen(truck.id)}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No trucks found for this fleet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <AddTrucksModal
        open={isAddModalOpen}
        onClose={handleCloseModal}
        fleetId={fleetId}
        onTruckAdded={handleTruckAdded}
      />
      <UpdateTruckModal
        open={isUpdateTruckOpen}
        onClose={handleUpdateTruckClose}
        truckId={truckId}
        onTruckUpdated={handleTruckAdded}
      />
    </div>
  );
};

export default FleetTrucksTable;
