


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


import {  offer } from "../../../utils/types";
import {  blockOffer, getOffer } from "../../../service/api/agent/apiMethod";
import {  useSelector } from "react-redux";
import { RootState } from "../../../utils/redux/app/store";
import AddOffer from "./AddOffer";
import Swal from "sweetalert2";
import EditOffer from "./EditOffer";



const rowsPerPageOptions = [5, 10, 25];

const Offer:React.FC = () => {
    const [api, setApi] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [offerData, setOfferData] = useState<offer[]>([]);
  const [editOfferData, setEditOfferData] = useState<offer|null>();

  const [filteredRows, setFilteredRows] = useState<offer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);

  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleEdit = (row:offer) => {
    setEditOfferData(row)
    setIsEditModal(!isEditModal);
  };

  const agent = useSelector((state: RootState) => state.agent);

  const color = grey[200];

  useEffect(() => {
    getDetails();
  }, [api]);

  const getDetails = async () => {
    try {
      const response = await getOffer(agent.agentId);
      if (response && Array.isArray(response.data)) {
        setOfferData(response.data);
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
      const filtered = offerData.filter((bookingValue) =>
        Object.values(bookingValue).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredRows(filtered);
    }, 1000);

    return () => clearTimeout(debounce);
  }, [searchQuery, offerData]);

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

   

    const handleDelete=async(id:string|undefined)=>{
        const result = await Swal.fire({
            title: "Are you sure to delete offer?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          });
        
          if (result.isConfirmed) {
            try {
              await blockOffer(id);
              setApi((prev) => !prev);

            } catch (error) {
              const errorMessage = (error as Error).message;
              toast.error(errorMessage);
            }
          }
    }
    

  return (
    <div className="mx-5 ">
      <div className="flex justify-between">
        <input
          placeholder="Search"
          className="border-2 my-6 p-2"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className='agent_button my-6'    onClick={toggleModal }>Add Offer</button>
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
                Name
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
              Discount Value
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
                 Start Date
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
                End Date
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
            ).map((row: offer, index) => ( row.isActive && (
                <TableRow key={row._id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.discountValue}%</TableCell>
                  <TableCell align="center">{new Date(row.startDate).toLocaleDateString()}</TableCell>
                  <TableCell align="center">{new Date(row.endDate).toLocaleDateString()}</TableCell>
                  <TableCell align="center">
                    <button
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                   onClick={()=>{handleEdit(row)}}
                   >
                      Edit
                    </button>
                    <button
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                    onClick={()=>{handleDelete(row._id)}}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              )))}
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


      {isModalOpen&&(<AddOffer setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />)}
      
      {isEditModal&&(<EditOffer setIsEditModal={setIsEditModal} isEditModal={isEditModal} editOfferData={editOfferData} setApi={setApi} api={api} />)}
    </div>
  );
};




export default Offer;