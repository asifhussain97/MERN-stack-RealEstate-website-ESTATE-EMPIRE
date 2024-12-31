import React from 'react';
import { grey } from '@mui/material/colors';
import {  TableCell, TableRow, } from '@mui/material';

type tableHead={
    heading:string[]
}

const TableHeader:React.FC<tableHead> = ({heading}) => {

    const color = grey[200];
  return (
   
    <TableRow sx={{width:'100%'}}>
        {heading.map((value)=>(
      <TableCell align="center" sx={{  fontWeight: 'bold', backgroundColor: color, color: 'black' }}>{value}</TableCell>

        ))}

    </TableRow>

  );
}

export default TableHeader;