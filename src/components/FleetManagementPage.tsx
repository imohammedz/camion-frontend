// src/components/FleetManagementPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const FleetManagementPage: React.FC = () => {
  const navigate = useNavigate();

  // Hardcoded dummy fleet data
  const fleets = [
    {
      fleetId: "FLEET001",
      fleetName: "Alpha Fleet",
      totalTrucks: 10,
      fleetManager: "John Doe",
      baseLocation: "New York",
      status: "Fully Operational",
    },
    {
      fleetId: "FLEET002",
      fleetName: "Beta Fleet",
      totalTrucks: 7,
      fleetManager: "Jane Smith",
      baseLocation: "Los Angeles",
      status: "Partially Operational",
    },
    {
      fleetId: "FLEET003",
      fleetName: "Gamma Fleet",
      totalTrucks: 12,
      fleetManager: "Robert Brown",
      baseLocation: "Chicago",
      status: "Under Maintenance",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Fleet Management</h1>
      <button
        className="btn btn-primary mb-4"
        onClick={() => navigate("/create-fleet")}
      >
        Create New Fleet
      </button>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Fleet ID</th>
            <th className="px-4 py-2">Fleet Name</th>
            <th className="px-4 py-2">Total Trucks</th>
            <th className="px-4 py-2">Fleet Manager</th>
            <th className="px-4 py-2">Base Location</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {fleets.map((fleet) => (
            <tr key={fleet.fleetId}>
              <td className="border px-4 py-2">{fleet.fleetId}</td>
              <td className="border px-4 py-2">{fleet.fleetName}</td>
              <td className="border px-4 py-2">{fleet.totalTrucks}</td>
              <td className="border px-4 py-2">{fleet.fleetManager}</td>
              <td className="border px-4 py-2">{fleet.baseLocation}</td>
              <td className="border px-4 py-2">{fleet.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FleetManagementPage;
