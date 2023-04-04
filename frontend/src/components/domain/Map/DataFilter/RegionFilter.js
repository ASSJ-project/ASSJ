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
import { setFilterRegion } from '@/actions/actions';
import data from '@/libs/json/region_code.json';

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
    dispatch(setFilterRegion(selectedSubcategories.join(', ')));
    // setSelectedSubcategories([]);
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        지역 선택
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>지역</DialogTitle>
        <DialogContent>
          {!showSubcategories ? (
            <>
              <DialogContentText>
                지역 선택 시 세부적으로 볼 수 있습니다.
              </DialogContentText>
              <List component="nav">
                {categoriesJson.map((category) => (
                  <ListItem
                    key={category.id}
                    button
                    selected={currentCategory === category.name}
                    onClick={() => handleCategoryClick(category)}
                  >
                    <ListItemText primary={category.name} />
                  </ListItem>
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
              <Button onClick={handleGoBack}>이전으로</Button>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {!showSubcategories && (
            <Button onClick={handleClose} color="primary">
              닫기
            </Button>
          )}
          {showSubcategories && (
            <Button onClick={handleSearch} color="primary">
              적용
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
