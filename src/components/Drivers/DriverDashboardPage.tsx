import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  InputAdornment,
  TextField,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import CardModel from "../ui/cardModel";
import { 
  Edit, 
  MoreVert, 
  Visibility, 
  Search, 
  FilterList,
  Person,
  AccessTime,
  CheckCircleOutline
} from "@mui/icons-material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useEffect, useState } from "react";
import AddDriverModal from "./AddDriverPopUpModel";
import { Driver } from "../../interfaces/Driver";
import axios from "axios";

// Import the DriverStatus enum
export enum DriverStatus {
  ASSIGNED = "ASSIGNED",
  AVAILABLE = "AVAILABLE",
  ON_LEAVE = "ON_LEAVE",
}

interface FleetDriverTableProps {
  fleetId?: string;
}

export const DriverDashBoardPage: React.FC<FleetDriverTableProps> = ({
  fleetId
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [AddModel, setIsAddModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All Statuses");

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, driverId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedDriverId(driverId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDriverId(null);
  };

  const handleViewDrivers = async (id: string | undefined) => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/fleets/${id}/drivers`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setDrivers(response.data);
      setFilteredDrivers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching drivers:", error);
      setError("Failed to fetch drivers.");
      setLoading(false);
    }
  };

  useEffect(() => {
    handleViewDrivers(fleetId);
  }, [fleetId]);

  // Handle search and filter functionality
  useEffect(() => {
    let result = [...drivers];
    
    // Apply search filter
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      result = result.filter(
        driver => 
          driver.name?.toLowerCase().includes(lowercasedQuery) || 
          driver.registerId?.toLowerCase().includes(lowercasedQuery) ||
          driver.phone?.includes(searchQuery)
      );
    }
    
    // Apply status filter
    if (statusFilter !== "All Statuses") {
      result = result.filter(driver => driver.status === statusFilter);
    }
    
    setFilteredDrivers(result);
  }, [searchQuery, statusFilter, drivers]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusFilterChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };

  const handleAddDriver = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    // Refresh driver list after adding a new driver
    handleViewDrivers(fleetId);
  };

  // Get counts for card models
  const getDriverCounts = () => {
    if (!drivers || drivers.length === 0) return { total: 0, assigned: 0, available: 0 };
    
    const assigned = drivers.filter(driver => driver.status === DriverStatus.ASSIGNED).length;
    const available = drivers.filter(driver => driver.status === DriverStatus.AVAILABLE).length;
    
    return {
      total: drivers.length,
      assigned,
      available
    };
  };

  const driverCounts = getDriverCounts();

  // Get status chip color based on driver status
  const getStatusChipColor = (status: string) => {
    switch (status) {
      case DriverStatus.ASSIGNED:
        return { bg: '#2196f3', color: 'white' }; // Blue
      case DriverStatus.AVAILABLE:
        return { bg: '#4caf50', color: 'white' }; // Green
      case DriverStatus.ON_LEAVE:
        return { bg: '#ff9800', color: 'black' }; // Orange
      default:
        return { bg: '#e0e0e0', color: 'black' }; // Grey
    }
  };

  return (
    <div className="container" style={{ padding: '24px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" fontWeight="600">
          Driver Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            color="primary" 
            startIcon={<CalendarTodayIcon />}
            sx={{ 
              borderRadius: '8px', 
              textTransform: 'none', 
              fontWeight: 500,
            }}
          >
            Shift Schedule
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<span>+</span>}
            onClick={handleAddDriver}
            sx={{ 
              borderRadius: '8px', 
              textTransform: 'none', 
              fontWeight: 500,
              bgcolor: '#000',
              '&:hover': {
                bgcolor: '#333',
              }
            }}
          >
            Add Driver
          </Button>
        </Box>
      </Box>

      {/* Search and filter section */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          placeholder="Search drivers..."
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
            sx: { borderRadius: 1 }
          }}
          sx={{ 
            flex: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: '4px',
            }
          }}
        />
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <Select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            displayEmpty
            input={<OutlinedInput />}
            renderValue={(selected) => selected}
            endAdornment={<FilterList sx={{ color: 'text.secondary', mr: 1 }} />}
            sx={{ borderRadius: '4px' }}
          >
            <MenuItem value="All Statuses">All Statuses</MenuItem>
            <MenuItem value={DriverStatus.ASSIGNED}>Assigned</MenuItem>
            <MenuItem value={DriverStatus.AVAILABLE}>Available</MenuItem>
            <MenuItem value={DriverStatus.ON_LEAVE}>On Leave</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Card Models with improved spacing and shadow */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 4,
          mb: 5,
        }}
      >
        {/* Total Drivers Card */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: '1px solid #e0e0e0',
          }}
        >
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Total Drivers
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 2 }}>
            <Typography variant="h3" fontWeight="600" sx={{ mr: 1 }}>
              {driverCounts.total}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
            <Person fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">Fleet personnel</Typography>
          </Box>
        </Paper>

        {/* Assigned Drivers Card */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: '1px solid #e0e0e0',
          }}
        >
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Assigned Drivers
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 2 }}>
            <Typography variant="h3" fontWeight="600" color="#2196f3" sx={{ mr: 1 }}>
              {driverCounts.assigned}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
            <AccessTime fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">Currently on duty</Typography>
          </Box>
        </Paper>

        {/* Available Drivers Card */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: '1px solid #e0e0e0',
          }}
        >
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Available Drivers
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 2 }}>
            <Typography variant="h3" fontWeight="600" color="#4caf50" sx={{ mr: 1 }}>
              {driverCounts.available}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
            <CheckCircleOutline fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">Ready for assignment</Typography>
          </Box>
        </Paper>
      </Box>

      {/* Driver Table with improved styling */}
      {loading ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1">Loading drivers...</Typography>
        </Box>
      ) : error ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      ) : (
        <TableContainer 
          component={Paper} 
          sx={{ 
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)', 
            borderRadius: '12px',
            overflow: 'hidden'
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Driver</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Contact</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Assigned Truck</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDrivers && filteredDrivers.length > 0 ? (
                filteredDrivers.map((driver) => {
                  const statusColor = getStatusChipColor(driver.status);
                  return (
                    <TableRow 
                      key={driver.registerId || driver.name}
                      sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}
                    >
                      <TableCell>{driver.name}</TableCell>
                      <TableCell>{driver.registerId}</TableCell>
                      <TableCell>
                        <Chip 
                          label={driver.status} 
                          sx={{ 
                            backgroundColor: statusColor.bg, 
                            color: statusColor.color,
                            fontWeight: 500,
                            minWidth: '100px',
                          }} 
                        />
                      </TableCell>
                      <TableCell>{driver.phone}</TableCell>
                      <TableCell>{driver.truckRegisteredId || 'Not Assigned'}</TableCell>
                      <TableCell>
                        <IconButton 
                          size="small" 
                          onClick={(e) => handleMenuOpen(e, driver.registerId || '')}
                          sx={{ color: '#666' }}
                        >
                          <MoreVert fontSize="small" />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl) && selectedDriverId === driver.registerId}
                          onClose={handleMenuClose}
                          sx={{ mt: 1 }}
                        >
                          <MenuItem onClick={handleMenuClose}>
                            <Visibility fontSize="small" sx={{ mr: 1, color: '#2196f3' }} />
                            View
                          </MenuItem>
                          <MenuItem onClick={handleMenuClose}>
                            <Edit fontSize="small" sx={{ mr: 1, color: '#ff9800' }} />
                            Edit
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="textSecondary">
                      {searchQuery || statusFilter !== "All Statuses" 
                        ? "No drivers match your search criteria."
                        : "No drivers found for this fleet."}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <AddDriverModal
        open={AddModel}
        fleetId={fleetId}
        onClose={handleCloseModal}
        onDriverAdded={handleAddDriver}
      />
    </div>
  );
};