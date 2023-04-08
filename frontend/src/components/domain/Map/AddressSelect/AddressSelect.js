import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import data from '@/libs/json/region_code.json';
import React, { useState } from 'react';

export default function AddressSelect() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const jsonData = data;

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="grouped-select">Grouping</InputLabel>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          id="grouped-select"
          label="Grouping"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {jsonData.map((category) => (
            <React.Fragment key={category.id}>
              <ListSubheader>{category.name}</ListSubheader>
              {category.subcategories.map((subcategory) => (
                <MenuItem key={subcategory.id} value={subcategory.id}>
                  {subcategory.region}
                </MenuItem>
              ))}
            </React.Fragment>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
