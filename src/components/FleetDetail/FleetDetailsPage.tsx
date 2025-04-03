import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  CircularProgress,
  CardContent,
  Card,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Fleet } from "../../interfaces/Fleet";
import CardModel from "../ui/cardModel";
import UpdateFleetDialog from "./UpdateFleetDialog";
import TruckDetailPage from "../TruckDetailPage";
import FleetTrucksTable from "./TruckDetailsPage";
import { TruckStatus } from "../../../public/enums/TruckStatus";
import { DriverDashBoardPage } from "../Drivers/DriverDashboardPage";

const FleetDetailDashBoard: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const { fleetId } = useParams<{ fleetId: string }>();
  const [fleet, setFleet] = useState<Fleet>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [totalTrucks, setTotalTrucks] = useState(0);
  const [activeTrucks, setActiveTrucks] = useState(0);
  const[maintenance, setMaintenance] = useState(0);
  const[idel, setIdel] = useState(0);

  const handleEdit = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!fleetId) {
      console.error("Fleet ID is null");
      setLoading(false);
      return;
    }

    const fetchFleet = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found!");

        const response = await axios.get(
          `http://localhost:5000/api/fleets/${fleetId}`,
          { headers: { Authorization: `${token}` } }
        );

        console.log(" API Response:", response.data);
        setFleet(response.data);
      } catch (error) {
        console.log("API Error:", error);
        throw new Error("Error fetching fleet details!");
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    const handleGetTrucks = async() => {
      try {
        const token = localStorage.getItem("token");
        if(!token) throw new Error("No authentication token found!");
        const getTrucks = await axios.get(`http://localhost:5000/api/fleets/${fleetId}/trucks`, {
          headers: { Authorization: `${token}` }
        });
        return getTrucks.data;
        }
      catch (error) {
        console.log("API Error:", error);
        throw new Error("Error fetching trucks");
        setError(true);
      }
    }

    handleGetTrucks().then((trucks) => {
      setTotalTrucks(trucks.length);
      setActiveTrucks(trucks.filter((truck: { status: TruckStatus; })=>truck.status === TruckStatus.AVAILABLE).length);
      setMaintenance(trucks.filter((truck: { status: TruckStatus; })=>truck.status === TruckStatus.UNDER_MAINTENANCE).length);
      setIdel(trucks.filter((truck: { status: TruckStatus; })=>truck.status === TruckStatus.IDLE).length);
     })
    fetchFleet();
  }, [fleetId]);



  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/fleets/${fleetId}`, {
        headers: { Authorization: `${token}` },
      });
      navigate("/fleets");
    } catch (error) {
      console.error("Error deleting fleet:", error);
      throw new Error("Failed to delete the fleet.");
    }
  };

  const handleTabChange = (_: React.ChangeEvent<unknown>, newIndex: number) =>
    setTabIndex(newIndex);

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );

  if (error || !fleet)
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h5" color="error">
          Error! Fleet not found.
        </Typography>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: 8 }} />
          Go Back
        </Button>
      </Box>
    );

  return (
    <div className="container y-20">
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button onClick={() => navigate(-1)} sx={{ minWidth: "auto" }}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </Button>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {fleet.fleet_name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "gray",
                }}
              >
                <LocationOnIcon fontSize="small" />
                <Typography variant="body2">
                  {fleet.fleet_base_location}
                </Typography>
                <Typography variant="body2">•</Typography>
                <CheckCircleIcon fontSize="small" color="success" />
                <Typography variant="body2">
                  {fleet.operational_status}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Edit & Delete Buttons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
            >
              Delete
            </Button>
            <UpdateFleetDialog open={open} onClose={handleClose} />
          </Box>
        </Box>

        {/* Tabs Section */}
        <Box sx={{ bgcolor: "#f5f5f5", p: 1, borderRadius: 2 }}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            TabIndicatorProps={{ style: { display: "none" } }}
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: 2,
                transition: "background 0.3s",
                padding: "12px 24px",
              },
              "& .Mui-selected": {
                backgroundColor: "white",
              },
            }}
          >
            <Tab label="Overview" />
            <Tab label="Trucks" />
            <Tab label="Drivers" />
            <Tab label="Shifts" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        {tabIndex === 0 && (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 3,
              mt: 3,
            }}
          >
            <CardModel
              title="Total Trucks"
              value={totalTrucks}
              subtitle="Fleet capacity"
              color="black"
            />
            <CardModel
              title="Active Trucks"
              value={activeTrucks}
              subtitle="operational"
              color="green"
            />
            <CardModel
              title="In Maintenance"
              value={maintenance}
              subtitle="Scheduled services"
              color="orange"
            />
            <CardModel
              title="Idle Trucks"
              value={idel}
              subtitle="Available for assignment"
              color="gray"
            />
          </Box>

            {/* Fleet Performance Section */}
            <Box sx={{ mt: 4 }}>
              <Card
                sx={{
                  p: 2,
                  textAlign: "center",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Fleet Performance
                  </Typography>
                  <Typography sx={{ color: "text.secondary", mb: 2 }}>
                    Overall fleet metrics and performance indicators
                  </Typography>
                  <Box
                    sx={{
                      height: 200,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px dashed gray",
                      borderRadius: 1,
                      bgcolor: "#f5f5f5",
                    }}
                  >
                    <Typography sx={{ color: "gray" }}>
                      Fleet performance chart would appear here
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </>
        )}

        {tabIndex === 1 && (
            <FleetTrucksTable fleetId={fleetId} />
        )}
        {tabIndex === 2 && (
         <DriverDashBoardPage fleetId={fleetId} />
        )}
        {tabIndex === 3 && (
          <Typography variant="h6" mt={3}>
            Shifts Information
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default FleetDetailDashBoard;
