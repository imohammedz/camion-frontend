import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import {TruckStatus} from '../../public/enums/TruckStatus';
interface TruckDetailsProps {
  truck: {
    truck_model: string;
    registration_number: string;
    manufacturer: string;
    year_of_manufacture: string;
    capacity: string;
    dimensions: string;
    fuel_type: string;
    mileage: string;
    status: TruckStatus;
  };
  handleTruckChange: (field: string, value: any) => void;
}

const TruckDetails: React.FC<TruckDetailsProps> = ({ truck, handleTruckChange }) => {
  return (
    <div className="mb-4">
      <div className="form-group mb-2">
        <label>Truck Model:</label>
        <input
          type="text"
          className="form-control"
          value={truck.truck_model}
          onChange={(e) => handleTruckChange("truck_model", e.target.value)}
        />
      </div>
      <div className="form-group mb-2">
        <label>Registration Number:</label>
        <input
          type="text"
          className="form-control"
          value={truck.registration_number}
          onChange={(e) => handleTruckChange("registration_number", e.target.value)}
        />
      </div>
      <div className="form-group mb-2">
        <label>Manufacturer:</label>
        <input
          type="text"
          className="form-control"
          value={truck.manufacturer}
          onChange={(e) => handleTruckChange("manufacturer", e.target.value)}
        />
      </div>
      <div className="form-group mb-2">
        <label>Year of Manufacture:</label>
        <input
          type="text"
          className="form-control"
          value={truck.year_of_manufacture}
          onChange={(e) => handleTruckChange("year_of_manufacture", e.target.value)}
        />
      </div>
      <div className="form-group mb-2">
        <label>Capacity (tons):</label>
        <input
          type="text"
          className="form-control"
          value={truck.capacity}
          onChange={(e) => handleTruckChange("capacity", e.target.value)}
        />
      </div>
      <div className="form-group mb-2">
        <label>Dimensions:</label>
        <input
          type="text"
          className="form-control"
          value={truck.dimensions}
          onChange={(e) => handleTruckChange("dimensions", e.target.value)}
        />
      </div>
      <div className="form-group mb-2">
        <label>Fuel Type:</label>
        <select
          value={truck.fuel_type}
          onChange={(e) => handleTruckChange("fuel_type", e.target.value)}
          className="input"
        >
          <option value="diesel">Diesel</option>
          <option value="gasoline">Gasoline</option>
          <option value="electric">Electric</option>
        </select>
      </div>
      <div className="form-group mb-2">
        <label>Mileage (km/l):</label>
        <input
          type="text"
          className="form-control"
          value={truck.mileage}
          onChange={(e) => handleTruckChange("mileage", e.target.value)}
        />
      </div>
      <div className="form-group mb-2">
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={truck.status}
            onChange={(e) => handleTruckChange("status", e.target.value)}
          >
            {Object.values(TruckStatus).map((status) => (
              <MenuItem key={status} value={status}>
                {status.replace(/_/g, " ")}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default TruckDetails;