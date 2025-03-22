import {FleetOperationalStatus} from './../../public/enums/FleetOperationalStatus';
export interface Fleet {
    id: string;
    fleet_name: string;
    fleet_base_location: string;
    operational_status: FleetOperationalStatus; 
    createdAt: Date;
    createdBy: string;
  }