import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

import {
  blockProperty,
  getAllPropertyDeatails,
} from "../../../service/api/admin/apiMethod";
import { toast } from "react-toastify";
import Modal from "./Modal";
import Swal from "sweetalert2";
import { propertyDataTypes } from "../../../utils/types";
import { propertyAdd } from "../../../utils/redux/slice/PropertySlice";
import { useDispatch } from "react-redux";
import { search } from "../../../utils/SearchLogic";
import Search from "../../../components/Admin/Table/Search";
import Pagination from "../../../components/Admin/Table/Pagination";
import TableHeader from "../../../components/Admin/Table/TableHeader";

const rowsPerPageOptions = [5, 10, 25];

const PropertyType: React.FC = () => {
  const [page, setPage] = useState(0);
  const [api, setApi] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyData, setPropertyData] = useState<propertyDataTypes[]>([]);
  const [filteredRows, setFilteredRows] = useState<propertyDataTypes[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [heading] = useState([
    "id",
    "name",
    "description",
    "Active",
    "Actions",
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    getDetails();
  }, [api]);

  const getDetails = async () => {
    try {
      const response = await getAllPropertyDeatails();
      if (response && Array.isArray(response.data)) {
        setPropertyData(response.data);
        console.log(response.data, "response.data");

        dispatch(propertyAdd({ data: response.data }));

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
      const filtered = search(propertyData, searchQuery);
      setFilteredRows(filtered);
    }, 1000);

    return () => clearTimeout(debounce);
  }, [searchQuery, propertyData]);

  const handleClick = (id: number | string) => {
    Swal.fire({
      title: "Are you sure to block property?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        blockProperty(id)
          .then((response) => {
            console.log(response);
            setApi(!api);
          })
          .catch((error) => {
            toast.error(error?.message);
          });
      }
    });
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);

  return (
    <div className="mx-5">
      <div className="flex justify-between">
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <button
          className="text-white  bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 my-6"
          onClick={() => setShowModal(true)}
        >
          Add Property
        </button>
        {showModal && (
          <Modal setShowModal={setShowModal} setApi={setApi} api={api} />
        )}
      </div>

      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableHeader heading={heading} />
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredRows.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredRows
            ).map((row: propertyDataTypes, index) => (
              <TableRow>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">
                  <div className="flex items-center gap-4">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={row.image ? row.image : ""}
                      alt=""
                    />
                    <div className="font-medium">
                      <div>{row.name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">
                  {row.isBlocked ? " active" : "blocked"}
                </TableCell>
                <TableCell align="center">
                  {!row.isBlocked ? (
                    <button
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-4 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 "
                      onClick={() => handleClick(row._id)}
                    >
                      unblock
                    </button>
                  ) : (
                    <button
                      className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 me-4 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                      onClick={() => handleClick(row._id)}
                    >
                      block
                    </button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filteredRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
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
      <Pagination
        setPage={setPage}
        page={page}
        setRowsPerPage={setRowsPerPage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        count={filteredRows.length}
      />
    </div>
  );
};

export default PropertyType;

