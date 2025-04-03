import  {DriverStatus}  from "./../../public/enums/DriverStatus";
export interface Driver {
    id: string;
    name: string;
    registerId: string;
    email: string;
    phone: string;
    truckRegisteredId: string;
    license: string;
    experience: string;
    status: DriverStatus;
    fleetId?: string;
}