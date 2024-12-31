import { TablePagination } from '@mui/material';
import React from 'react';

type paginationProp={
    setPage:React.Dispatch<React.SetStateAction<number>>,
    page:number,
    setRowsPerPage:React.Dispatch<React.SetStateAction<number>>,
    rowsPerPage:number,
    rowsPerPageOptions:number[],
    count:number

}


const Pagination:React.FC<paginationProp> = ({setPage,page,setRowsPerPage,rowsPerPage,rowsPerPageOptions,count}) => {

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
  return (
    <div>

<TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
    </div>
  );
}

export default Pagination;