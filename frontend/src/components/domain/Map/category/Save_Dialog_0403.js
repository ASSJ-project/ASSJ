import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSubcategory } from '@/actions/actions';
import data from './region_code.json';

export default function ModalWithCategories() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('Category 1');
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  const categoriesJson = data;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowSubcategories(false);
  };

  const handleCategoryClick = (category) => {
    setCurrentCategory(category.name);
    setShowSubcategories(true);
  };

  const handleSubcategoryClick = (subcategory) => {
    const updatedSelectedSubcategories = { ...selectedSubcategories };
    if (
      updatedSelectedSubcategories[currentCategory] &&
      updatedSelectedSubcategories[currentCategory].includes(subcategory)
    ) {
      updatedSelectedSubcategories[currentCategory] =
        updatedSelectedSubcategories[currentCategory].filter(
          (item) => item !== subcategory
        );
    } else {
      updatedSelectedSubcategories[currentCategory] = [
        ...(updatedSelectedSubcategories[currentCategory] || []),
        subcategory,
      ];
    }
    setSelectedSubcategories(updatedSelectedSubcategories);
  };

  const handleGoBack = () => {
    setSelectedSubcategories([]);
    setShowSubcategories(false);
  };

  const handleSearch = () => {
    dispatch(setSubcategory(selectedSubcategories.join(', ')));
    setSelectedSubcategories([]);
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open Modal
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Categories</DialogTitle>
        <DialogContent>
          {!showSubcategories ? (
            <>
              <DialogContentText>
                Click a category to see its subcategories
              </DialogContentText>
              <List component="nav">
                {categoriesJson
                  .find((category) => category.name === currentCategory)
                  .subcategories.map((subcategory) => (
                    <FormControlLabel
                      key={subcategory.id}
                      control={
                        <Checkbox
                          checked={
                            selectedSubcategories[currentCategory] &&
                            selectedSubcategories[currentCategory].includes(
                              subcategory.region
                            )
                          }
                          onChange={() =>
                            handleSubcategoryClick(subcategory.region)
                          }
                        />
                      }
                      label={subcategory.region}
                    />
                  ))}
              </List>
            </>
          ) : (
            <>
              <h2>{currentCategory}</h2>
              <List component="nav">
                {categoriesJson
                  .find((category) => category.name === currentCategory)
                  .subcategories.map((subcategory) => (
                    <FormControlLabel
                      key={subcategory.id}
                      control={
                        <Checkbox
                          checked={selectedSubcategories.includes(
                            subcategory.region
                          )}
                          onChange={() =>
                            handleSubcategoryClick(subcategory.region)
                          }
                        />
                      }
                      label={subcategory.region}
                    />
                  ))}
              </List>
              <Button onClick={handleGoBack}>Go back</Button>
              <div>
                <h3>Selected Subcategories:</h3>
                <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                  {(selectedSubcategories[currentCategory] || []).map(
                    (subcategory, index) => (
                      <li
                        key={index}
                        style={{ fontWeight: 'bold', color: 'blue' }}
                      >
                        {subcategory}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {!showSubcategories && (
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          )}
          {showSubcategories && (
            <Button onClick={handleSearch} color="primary">
              Search
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
