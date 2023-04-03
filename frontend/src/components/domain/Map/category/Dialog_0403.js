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

export default function ModalWithCategories() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('Category 1');
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowSubcategories(false);
  };

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
    setShowSubcategories(true);
  };

  const handleSubcategoryClick = (subcategory) => {
    if (selectedSubcategories.includes(subcategory)) {
      setSelectedSubcategories(
        selectedSubcategories.filter((item) => item !== subcategory)
      );
    } else {
      setSelectedSubcategories([...selectedSubcategories, subcategory]);
    }
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
                <ListItem
                  button
                  selected={currentCategory === 'Category 1'}
                  onClick={() => handleCategoryClick('Category 1')}
                >
                  <ListItemText primary="Category 1" />
                </ListItem>
                <ListItem
                  button
                  selected={currentCategory === 'Category 2'}
                  onClick={() => handleCategoryClick('Category 2')}
                >
                  <ListItemText primary="Category 2" />
                </ListItem>
              </List>
            </>
          ) : (
            <>
              <h2>{currentCategory}</h2>
              <List component="nav">
                {['Subcategory 1', 'Subcategory 2', 'Subcategory 3'].map(
                  (subcategory) => (
                    <FormControlLabel
                      key={subcategory}
                      control={
                        <Checkbox
                          checked={selectedSubcategories.includes(subcategory)}
                          onChange={() => handleSubcategoryClick(subcategory)}
                        />
                      }
                      label={subcategory}
                    />
                  )
                )}
              </List>
              <Button onClick={handleGoBack}>Go back</Button>
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
