// src/components/TruckDetails.tsx
import React from "react";

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
    status: string;
  };
  index: number;
  handleTruckChange: (index: number, field: string, value: any) => void;
}

const TruckDetails: React.FC<TruckDetailsProps> = ({
  truck,
  index,
  handleTruckChange,
}) => {
  return (
    <div className="mb-4">
      <div className="form-group mb-2">
        <label>Truck Model:</label>
        <input
          type="text"
          className="form-control"
          value={truck.truck_model}
          onChange={(e) =>
            handleTruckChange(index, "truck_model", e.target.value)
          }
        />
      </div>
      <div className="form-group mb-2">
        <label>Registration Number:</label>
        <input
          type="text"
          className="form-control"
          value={truck.registration_number}
          onChange={(e) =>
            handleTruckChange(index, "registration_number", e.target.value)
          }
        />
      </div>
      <div className="form-group mb-2">
        <label>Manufacturer:</label>
        <input
          type="text"
          className="form-control"
          value={truck.manufacturer}
          onChange={(e) =>
            handleTruckChange(index, "manufacturer", e.target.value)
          }
        />
      </div>
      <div className="form-group mb-2">
        <label>Year of Manufacture:</label>
        <input
          type="text"
          className="form-control"
          value={truck.year_of_manufacture}
          onChange={(e) =>
            handleTruckChange(index, "year_of_manufacture", e.target.value)
          }
        />
      </div>
      <div className="form-group mb-2">
        <label>Capacity (tons):</label>
        <input
          type="text"
          className="form-control"
          value={truck.capacity}
          onChange={(e) => handleTruckChange(index, "capacity", e.target.value)}
        />
      </div>
      <div className="form-group mb-2">
        <label>Dimensions:</label>
        <input
          type="text"
          className="form-control"
          value={truck.dimensions}
          onChange={(e) =>
            handleTruckChange(index, "dimensions", e.target.value)
          }
        />
      </div>
      <div className="form-group mb-2">
        <label>Fuel Type:</label>

        <select
          value={truck.fuel_type}
          onChange={(e) =>
            handleTruckChange(index, "fuel_type", e.target.value)
          }
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
          onChange={(e) => handleTruckChange(index, "mileage", e.target.value)}
        />
      </div>
      <div className="form-group mb-2">
        <label>Status:</label>
        <input
          type="text"
          className="form-control"
          value={truck.status}
          onChange={(e) => handleTruckChange(index, "status", e.target.value)}
        />
      </div>
    </div>
  );
};

export default TruckDetails;
