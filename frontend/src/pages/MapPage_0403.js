import { Button, Modal, TextField } from '@material-ui/core';
import CategoryDropdown from '@/components/domain/Map/CategoryDropdown_0403';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const SearchModal = () => {
  const selectedSubcategory = useSelector((state) => state.selectedSubcategory);

  return (
    <>
      <div>
        <h2>Selected Subcategory: {selectedSubcategory}</h2>
      </div>
      <CategoryDropdown />
    </>
  );
};

export default SearchModal;
