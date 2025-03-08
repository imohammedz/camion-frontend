import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FleetRow from "../ui/tableComponent";
import styles from "./FleetManagement.module.css";
import axios from "axios";
import {Fleet}  from "../../interfaces/Fleet";

const FleetManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const [fleets, setFleets] = useState<Fleet[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFleets = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/fleets", {
          headers: {
            Authorization: `${token}`,
          },
        });
        if (response.status === 200) {
          setFleets(response.data);
        } else {
          throw new Error("Failed to fetch fleet data");
        }
      } catch (error) {
        console.error("Error fetching fleets:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchFleets();
  }, []);

  // If there's an error, show a generic error message
  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error!</h1>
        <p className="text-lg text-gray-700">
          Something went wrong. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Fleet Management</h1>

      <div className="flex justify-between mb-4">
        <button
          className={`${styles.button} ${styles.backButton}`}
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>

      <TableContainer
        component={Paper}
        sx={{ maxWidth: 800, mx: "auto", my: 4 }}
      >
        {loading ? (
          <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />
        ) : fleets.length === 0 ? (
          <>
            <Typography align="center" sx={{ py: 2 }}>
              No fleet data available.
            </Typography>
            <Typography align="center" sx={{ py: 2 }}>
              <Button
                variant="contained"
                onClick={() => navigate("/create-fleet")}
              >
                Create Fleet
              </Button>
            </Typography>
          </>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Fleet Name</b>
                </TableCell>
                <TableCell>
                  <b>Base Location</b>
                </TableCell>
                <TableCell>
                  <b>Operational Status</b>
                </TableCell>
                <TableCell></TableCell> {/* For arrow button */}
              </TableRow>
            </TableHead>
            <TableBody>
              {fleets.map((fleet) => (
                <FleetRow key={fleet.id} fleet={fleet} />
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
};

export default FleetManagementPage;
