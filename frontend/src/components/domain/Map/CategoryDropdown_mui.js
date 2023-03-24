import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import data from './job_code.json';

const CategoryDropdown = () => {
  const [categories, setItems] = useState(data);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubcategory('');
  };

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
  };

  const selectedCategoryObj = categories.find(
    (category) => category.id === selectedCategory
  );

  return (
    <FormControl sx={{ m: 1, minWidth: 50 }}>
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>

      {selectedCategoryObj && (
        <div>
          <FormControl sx={{ m: 1, minWidth: 50 }}>
            <InputLabel id="subcategory-select-label">Subcategory</InputLabel>
            <Select
              labelId="subcategory-select-label"
              id="subcategory-select"
              value={selectedSubcategory}
              onChange={handleSubcategoryChange}
            >
              <MenuItem value="">Select a subcategory</MenuItem>
              {selectedCategoryObj.subcategories.map((subcategory) => (
                <MenuItem key={subcategory.id} value={subcategory.id}>
                  {subcategory.subcategories}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}
    </FormControl>
  );
};

export default CategoryDropdown;
