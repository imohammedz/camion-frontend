// src/components/CreateFleetPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateFleetPage: React.FC = () => {
  const [fleetName, setFleetName] = useState("");
  const [truckDetails, setTruckDetails] = useState([
    { truckId: "", model: "", capacity: "" },
  ]);

  const navigate = useNavigate();

  const handleAddTruck = () => {
    setTruckDetails([
      ...truckDetails,
      { truckId: "", model: "", capacity: "" },
    ]);
  };

  const handleTruckChange = (index: number, field: string, value: string) => {
    const updatedTrucks = [...truckDetails];
    updatedTrucks[index] = { ...updatedTrucks[index], [field]: value };
    setTruckDetails(updatedTrucks);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !fleetName ||
      truckDetails.some(
        (truck) => !truck.truckId || !truck.model || !truck.capacity
      )
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    alert(`Fleet "${fleetName}" created with ${truckDetails.length} trucks.`);
    // Further processing logic here
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Fleet</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label>Fleet Name:</label>
          <input
            type="text"
            className="form-control"
            value={fleetName}
            onChange={(e) => setFleetName(e.target.value)}
          />
        </div>

        <h2 className="text-xl font-semibold mb-3">Truck Details</h2>
        {truckDetails.map((truck, index) => (
          <div key={index} className="mb-4">
            <div className="form-group mb-2">
              <label>Truck ID:</label>
              <input
                type="text"
                className="form-control"
                value={truck.truckId}
                onChange={(e) =>
                  handleTruckChange(index, "truckId", e.target.value)
                }
              />
            </div>
            <div className="form-group mb-2">
              <label>Model:</label>
              <input
                type="text"
                className="form-control"
                value={truck.model}
                onChange={(e) =>
                  handleTruckChange(index, "model", e.target.value)
                }
              />
            </div>
            <div className="form-group mb-2">
              <label>Capacity (tons):</label>
              <input
                type="text"
                className="form-control"
                value={truck.capacity}
                onChange={(e) =>
                  handleTruckChange(index, "capacity", e.target.value)
                }
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-secondary mb-4"
          onClick={handleAddTruck}
        >
          Add Another Truck
        </button>

        <div className="flex justify-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            Back
          </button>
          <button type="submit" className="btn btn-primary">
            Create Fleet
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFleetPage;
