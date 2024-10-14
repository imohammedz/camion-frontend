// src/components/TruckDetails.tsx
import React from "react";

interface TruckDetailsProps {
  truck: {
    truck_name: string;
    registration_number: string;
    manufacturer: string;
    year_of_manufacture: string;
    capacity: string;
    dimensions: string;
    fuel_type: string;
    mileage: string;
    engine_type: string;
    status: string;
    image_url: string;
    last_service_date: string;
    next_service_due_date: string;
    current_location: string;
    gps_installed: boolean;
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
        <label>Truck Name:</label>
        <input
          type="text"
          className="form-control"
          value={truck.truck_name}
          onChange={(e) =>
            handleTruckChange(index, "truck_name", e.target.value)
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
        <label>Engine Type:</label>
        <input
          type="text"
          className="form-control"
          value={truck.engine_type}
          onChange={(e) =>
            handleTruckChange(index, "engine_type", e.target.value)
          }
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
      <div className="form-group mb-2">
        <label>Image URL:</label>
        <input
          type="text"
          className="form-control"
          value={truck.image_url}
          onChange={(e) =>
            handleTruckChange(index, "image_url", e.target.value)
          }
        />
      </div>
      <div className="form-group mb-2">
        <label>Last Service Date:</label>
        <input
          type="date"
          className="form-control"
          value={truck.last_service_date}
          onChange={(e) =>
            handleTruckChange(index, "last_service_date", e.target.value)
          }
        />
      </div>
      <div className="form-group mb-2">
        <label>Next Service Due Date:</label>
        <input
          type="date"
          className="form-control"
          value={truck.next_service_due_date}
          onChange={(e) =>
            handleTruckChange(index, "next_service_due_date", e.target.value)
          }
        />
      </div>
      <div className="form-group mb-2">
        <label>Current Location:</label>
        <input
          type="text"
          className="form-control"
          value={truck.current_location}
          onChange={(e) =>
            handleTruckChange(index, "current_location", e.target.value)
          }
        />
      </div>
      <div className="form-group mb-2">
        <label>GPS Installed:</label>
        <input
          type="checkbox"
          className="form-checkbox"
          checked={truck.gps_installed}
          onChange={(e) =>
            handleTruckChange(index, "gps_installed", e.target.checked)
          }
        />
      </div>
    </div>
  );
};

export default TruckDetails;
