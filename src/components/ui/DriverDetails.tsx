import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { DriverStatus } from "../../../public/enums/DriverStatus";
import { Driver } from "../../interfaces/Driver";

interface Truck {
  id: string;
  registration_number: string;
}

interface DriverDetailsProps {
  driver: Driver;
  trucks: Truck[];
  handleDriverChange: (field: keyof Driver, value: string) => void;
}

const DriverDetails: React.FC<DriverDetailsProps> = ({
  driver,
  trucks,
  handleDriverChange,
}) => {
  return (
    <>
      <TextField
        margin="dense"
        label="Name"
        name="name"
        fullWidth
        value={driver.name}
        onChange={(e) => handleDriverChange("name", e.target.value)}
        required
      />
      <TextField
        margin="dense"
        label="Email"
        name="email"
        type="email"
        fullWidth
        value={driver.email}
        onChange={(e) => handleDriverChange("email", e.target.value)}
        required
      />
      <TextField
        margin="dense"
        label="Phone"
        name="phone"
        fullWidth
        value={driver.phone}
        onChange={(e) => handleDriverChange("phone", e.target.value)}
        required
      />
      <TextField
        margin="dense"
        label="License"
        name="license"
        fullWidth
        value={driver.license}
        onChange={(e) => handleDriverChange("license", e.target.value)}
        required
      />
      <TextField
        margin="dense"
        label="Experience"
        name="experience"
        fullWidth
        value={driver.experience}
        onChange={(e) => handleDriverChange("experience", e.target.value)}
      />

      {/* Status Dropdown */}
      <TextField
        select
        margin="dense"
        label="Status"
        name="status"
        fullWidth
        value={driver.status}
        onChange={(e) => handleDriverChange("status", e.target.value)}
      >
        {Object.values(DriverStatus).map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </TextField>

      {/* Truck Dropdown */}
      <TextField
        select
        margin="dense"
        label="Assign Truck"
        name="truckRegisteredId"
        fullWidth
        value={driver.truckRegisteredId}
        onChange={(e) => handleDriverChange("truckRegisteredId", e.target.value)}
      >
        <MenuItem value="">None</MenuItem>
        {trucks.map((truck) => (
          <MenuItem key={truck.id} value={truck.registration_number}>
            {truck.registration_number}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

export default DriverDetails;