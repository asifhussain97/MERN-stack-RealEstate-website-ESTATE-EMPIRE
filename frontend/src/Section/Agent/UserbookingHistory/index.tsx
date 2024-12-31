import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";


import { toast } from "react-toastify";


import { bookingData } from "../../../utils/types";
import {  getUserBookingHistory } from "../../../service/api/agent/apiMethod";
import { NavigateFunction, useNavigate } from "react-router-dom";
import {  useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../utils/redux/app/store";
import { bookingAdd } from "../../../utils/redux/slice/bookingSlice";

export interface eventDataTypes {
  _id: number;
  name: string;
  description: string;
  image?: string;
  isBlocked?: boolean;
}

const rowsPerPageOptions = [5, 10, 25];

const UserbookingHistory: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookingData, setBookingData] = useState<bookingData[]>([]);
  const [filteredRows, setFilteredRows] = useState<bookingData[]>([]);
const dispatch=useDispatch()
  const agent = useSelector((state: RootState) => state.agent);

  const color = grey[200];
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      const response = await getUserBookingHistory(agent.agentId);
      if (response && Array.isArray(response.data)) {
        setBookingData(response.data);
        setFilteredRows(response.data);
      } else {
        toast.error("No user data found");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      const filtered = bookingData.filter((bookingValue) =>
        Object.values(bookingValue).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredRows(filtered);
    }, 1000);

    return () => clearTimeout(debounce);
  }, [searchQuery, bookingData]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleChangePage = ( newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);

  const handleLocation = async (bookingId: string|undefined) => {
  
     

    dispatch(bookingAdd({data:bookingId}))
        navigate("/agent/UserBookingDetails");
    
    
  };
  return (
    <div className="mx-5">
      <div className="flex justify-between">
        <input
          placeholder="Search"
          className="border-2 my-6 p-2"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{
                  maxWidth: "50px",
                  fontWeight: "bold",
                  backgroundColor: color,
                  color: "black",
                }}
              >
                ID
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  maxWidth: "150px",
                  fontWeight: "bold",
                  backgroundColor: color,
                  color: "black",
                }}
              >
                Username
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  maxWidth: "150px",
                  fontWeight: "bold",
                  backgroundColor: color,
                  color: "black",
                }}
              >
                Name of event
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  maxWidth: "50px",
                  fontWeight: "bold",
                  backgroundColor: color,
                  color: "black",
                }}
              >
                Phone
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  maxWidth: "50px",
                  fontWeight: "bold",
                  backgroundColor: color,
                  color: "black",
                }}
              >
                location
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  maxWidth: "50px",
                  fontWeight: "bold",
                  backgroundColor: color,
                  color: "black",
                }}
              >
                Total
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  maxWidth: "150px",
                  fontWeight: "bold",
                  backgroundColor: color,
                  color: "black",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredRows.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredRows
            ).map((row: bookingData, index) => (
              <TableRow key={row._id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{row.user.username}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.phone || "no number"}</TableCell>
                <TableCell align="center">{row.locationData.name}</TableCell>
                <TableCell align="center">{row.total}</TableCell>

                <TableCell align="center">
            
                  <button
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={() => handleLocation(row?._id)}
                  >
                    view
                  </button>
                </TableCell>
              </TableRow>
            ))}
            {filteredRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="h6" color="textSecondary">
                    No Data
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {emptyRows > 0 && filteredRows.length !== 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default UserbookingHistory;