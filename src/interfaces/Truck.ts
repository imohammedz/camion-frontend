// src/interfaces/Truck.ts

import { TruckStatus } from "../../public/enums/TruckStatus";

export interface Truck {
  truck_model: string;
  registration_number: string;
  manufacturer: string;
  year_of_manufacture: string;
  capacity: string;
  dimensions: string;
  fuel_type: string;
  mileage: string;
  status: TruckStatus;
  driver_id?: string;
  fleet_id:string;
}
