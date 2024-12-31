import React, { useEffect, useState } from 'react';
import Sidebar from '../Settings/contents/Sidebar';
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
import { useSelector } from 'react-redux';
import { RootState } from '../../../utils/redux/app/store';
import { toast } from 'react-toastify';
import {  transaction, wallet } from '../../../utils/types';
import { getWallet } from '../../../service/api/agent/apiMethod';
import Pagination from '../../../components/Admin/Table/Pagination';
import TableHeader from '../../../components/Admin/Table/TableHeader';
import { search } from '../../../utils/SearchLogic';
import Search from '../../../components/Admin/Table/Search';

  const rowsPerPageOptions = [5, 10, 25];
const Wallet:React.FC = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const [searchQuery, setSearchQuery] = useState("");
    const [walletData, setWalletData] = useState<wallet>();
    const [filteredRows, setFilteredRows] =  useState<transaction[]>([]);
    const [heading] = useState([
      "id",
     
      "amount",
      "Type",
      "Date",
    ]);
    const agent = useSelector((state: RootState) => state.agent);
    
  
    useEffect(() => {
      getDetails();
    }, []);
  
    const getDetails = async () => {
      try {
        if(!agent.agentId)return

        const response = await getWallet(agent.agentId);
        
        if (response && response.data) {
            if (Array.isArray(response.data.transactions)) {
             
                
                setFilteredRows(response.data.transactions );
              } else {
                toast.error("Unexpected response format");
              }
        
            
            setWalletData(response.data as wallet);

        
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
        if(!walletData)return 
        const filtered:transaction[]|[] =search(walletData.transactions, searchQuery)??[]
        setFilteredRows(filtered);
      }, 1000);
  
      return () => clearTimeout(debounce);
    }, [searchQuery, walletData]);
  
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    };
  

   
    
 
   
    const  emptyRows=rowsPerPage -
      Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage)
    

  return (
    <div className="h-screen flex flex-col ">
    <div className="flex-grow flex justify-center items-center lg:px-48">
    <Sidebar />
    <div className="grid gap-6 items-start max-w-6xl px-4 mx-auto py-6 bg-white w-2/3">
      <div className="grid gap-4">
        <div className="bg-muted rounded-lg p-6 flex items-center justify-between">
          <div className='text-center mx-auto'>
            <div className="text-sm text-muted-foreground">Current Balance</div>
            <div className="text-4xl font-bold">₹{walletData?.walletBalance}</div>
          </div>
          
        </div>
        <div>
          <div className='text-center'>
            <h1>Transaction History</h1>
            <p>View your recent transactions and account activity.</p>
          </div>
          <div className="flex justify-between">
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          </div>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                <TableHeader heading={heading} />

               
                 
                
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filteredRows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filteredRows
                ).map((row: transaction, index) =>  (
                    <TableRow key={row._id}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{row.amount}</TableCell>
                      <TableCell align="center">{row.type}</TableCell>
                      <TableCell align="center">{new Date(row.date).toLocaleDateString()}</TableCell>
                  
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

          {filteredRows.length>0?(
            <Pagination
            setPage={setPage}
            page={page}
            setRowsPerPage={setRowsPerPage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
            count={filteredRows.length}
          />
          ):''}
          
        </div>
      </div>
    </div>
    </div>
  </div>
  );
}

export default Wallet;