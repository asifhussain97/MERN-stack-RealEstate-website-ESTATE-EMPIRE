import { TextField } from '@mui/material';
import React from 'react';

type searchProps={
    searchQuery:string,
    setSearchQuery:React.Dispatch<React.SetStateAction<string>>
}

const Search:React.FC <searchProps>= ({searchQuery,setSearchQuery}) => {

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
      };
  return (
    <TextField
    label="Search"
    variant="outlined"
    value={searchQuery}
    onChange={handleSearchChange}
    style={{ marginBottom: '1rem' }}
  />
  );
}

export default Search;