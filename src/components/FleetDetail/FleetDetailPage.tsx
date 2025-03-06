import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CircularProgress, Typography, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEdit,
  faTrash,
  faEye,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import styles from "./FleetDetail.module.css";

const FleetDetailPage: React.FC = () => {
  const { fleetId } = useParams<{ fleetId: string }>();
  const [fleet, setFleet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [trucks, setTrucks] = useState<any[]>([]);
  const [viewTrucks, setViewTrucks] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!fleetId) {
      console.error("Fleet ID is undefined!");
      return;
    }

    const fetchFleet = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/fleets/${fleetId}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        if (response.status === 200) {
          setFleet(response.data);
        } else {
          throw new Error("Fleet not found");
        }
      } catch (error) {
        console.error("Error fetching fleet:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchFleet();
  }, [fleetId]);

  const handleViewTrucks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/fleets/${fleetId}/trucks`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setTrucks(response.data);
      setViewTrucks(true);
    } catch (error) {
      console.error("Error fetching trucks:", error);
      alert("Failed to fetch trucks.");
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/fleets/${fleetId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      alert("Fleet deleted successfully");
      navigate("/fleets");
    } catch (error) {
      console.error("Error deleting fleet:", error);
      alert("Failed to delete the fleet.");
    }
  };

  const handleEdit = () => {
    navigate(`/fleets/${fleetId}/edit`);
  };

  const handleAddTruck = () => {
    navigate(`/fleets/${fleetId}/add-trucks`);
  };

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h1 className={styles.errorTitle}>Error!</h1>
        <p className={styles.errorMessage}>Fleet not found.</p>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back
      </button>

      {loading ? (
        <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />
      ) : fleet ? (
        <div>
          <h2 className={styles.title}>{fleet.fleet_name}</h2>
          <p className={styles.info}>
            <strong>Base Location:</strong> {fleet.fleet_base_location}
          </p>
          <p className={styles.info}>
            <strong>Operational Status:</strong> {fleet.operational_status}
          </p>

          <div className={styles.actionButtons}>
            <button className={styles.editButton} onClick={handleEdit}>
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              Edit
            </button>
            <button className={styles.deleteButton} onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} className="mr-2" />
              Delete
            </button>
            <button className={styles.viewButton} onClick={handleViewTrucks}>
              <FontAwesomeIcon icon={faEye} className="mr-2" />
              View Trucks
            </button>
            <button className={styles.addButton} onClick={handleAddTruck}>
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add Truck
            </button>
          </div>

          {viewTrucks && (
            <div className={styles.truckList}>
              <h3 className={styles.truckListTitle}>Truck List</h3>
              {trucks.length > 0 ? (
                <ul className={styles.truckListItems}>
                  {trucks.map((truck) => (
                    <li key={truck._id} className={styles.truckItem}>
                      <span>
                        {truck.registration_number} - {truck.truck_name}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No trucks available for this fleet.</p>
              )}
            </div>
          )}
        </div>
      ) : (
        <p>No fleet data available.</p>
      )}
    </div>
  );
};

export default FleetDetailPage;
