// SubcategoryList.js
import React from 'react';
import { Button, InputLabel } from '@mui/material';

const SubcategoryList = ({
  subcategories,
  selectedSubcategories,
  handleSubcategoryChange,
}) => {
  return (
    <div>
      <InputLabel id="subcategory-select-label">Subcategory</InputLabel>
      <div style={{ height: '200px', overflowY: 'auto' }}>
        {subcategories
          .sort((a, b) => a.subcategories.localeCompare(b.subcategories))
          .map((subcategory) => (
            <Button
              key={subcategory.id}
              variant={
                selectedSubcategories.includes(subcategory.id)
                  ? 'contained'
                  : 'outlined'
              }
              onClick={() =>
                handleSubcategoryChange({
                  target: { value: subcategory.id },
                })
              }
              sx={{ m: 1 }}
            >
              {subcategory.subcategories}
            </Button>
          ))}
      </div>
      <div>
        <InputLabel>Selected subcategories:</InputLabel>
        {selectedSubcategories.map((subcategoryId) => (
          <div key={subcategoryId}>{subcategoryId}</div>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryList;
