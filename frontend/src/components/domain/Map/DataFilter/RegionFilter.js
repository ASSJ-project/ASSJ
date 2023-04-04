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
import { withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { setFilterRegion } from '@/actions/actions';
import data from '@/libs/json/region_code.json';
import styled from 'styled-components';

// 다이얼로그 내용
const StyledDialogContent = withStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
})(DialogContent);

const StyledDialogTitle = withStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})(DialogTitle);

const SubcategoryList = styled.div`
  overflow: auto;
  max-height: 600px;
`;

const FilterButton = styled.button`
  width: 48%;
  height: 50px;
  background-color: white;
  border: 1px solid #b4c0d3;
  border-radius: 10px;
  font-size: 17px;
  font-weight: 400;
  padding: 8px 16px;
  cursor: pointer;
  margin: 10px;
  text-align: left;
  transition: background-color 0.3s;

  @media (max-width: 1110px) {
    width: 100%;
  }
  &:hover {
    background-color: #bbbbbb;
  }
`;

const SelectedSubcategories = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
  border-top: 2px solid #b4c0d3;
  padding-top: 8px;
  background-color: white;
`;

const SubcategoryChip = styled.div`
  background-color: #bbbbbb;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 400;
  padding: 8px 16px;
  margin: 4px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #999999;
  }
`;

export default function ModalWithCategories() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('Category 1');
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  // 모든 카테고리의 선택된 서브 카데고리 추적
  const [allSelectedSubcategories, setAllSelectedSubcategories] = useState({});

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
    // 서브 카테고리 추적
    setSelectedSubcategories(allSelectedSubcategories[category.name] || []);
    setShowSubcategories(true);
  };
  const handleSubcategoryClick = (subcategory) => {
    if (selectedSubcategories.includes(subcategory)) {
      setSelectedSubcategories(
        selectedSubcategories.filter((item) => item !== subcategory)
      );

      // 현재 카테고리의 선택된 서브 카테고리 저장
      setAllSelectedSubcategories({
        ...allSelectedSubcategories,
        [currentCategory]: selectedSubcategories.filter(
          (item) => item !== subcategory
        ),
      });
    } else {
      setSelectedSubcategories([...selectedSubcategories, subcategory]);

      // 현재 카테고리의 선택된 서브 카테고리 저장
      setAllSelectedSubcategories({
        ...allSelectedSubcategories,
        [currentCategory]: [...selectedSubcategories, subcategory],
      });
    }
  };

  const handleGoBack = () => {
    // 현재 카테고리의 선택된 서브 카테고리 저장
    setAllSelectedSubcategories({
      ...allSelectedSubcategories,
      [currentCategory]: selectedSubcategories,
    });
    setSelectedSubcategories([]);
    setShowSubcategories(false);
  };

  const handleSearch = () => {
    setAllSelectedSubcategories({
      ...allSelectedSubcategories,
      [currentCategory]: selectedSubcategories,
    });

    // 모든 선택된 서브 카테고리를 배열로 변환
    const allSelected = Object.values(allSelectedSubcategories).flat();

    dispatch(setFilterRegion(allSelected.join(', ')));
    setSelectedSubcategories([]);
    handleClose();
  };

  // 선택된 서브 카테고리 제거
  const handleRemoveSubcategory = (category, subcategory) => {
    const updatedSubcategories = allSelectedSubcategories[category].filter(
      (item) => item !== subcategory
    );

    setAllSelectedSubcategories({
      ...allSelectedSubcategories,
      [category]: updatedSubcategories,
    });
  };

  return (
    <div style={{display: 'inline'}}>
      <FilterButton
        onClick={handleClickOpen}
        selected={selectedSubcategories.length > 0}
      >
        지역
      </FilterButton>
      <Dialog open={open} onClose={handleClose}>
        <StyledDialogTitle>
          {/* 업종 */}
          {showSubcategories && (
            <Button onClick={handleGoBack} style={{ marginRight: '8px' }}>
              이전으로
            </Button>
          )}
        </StyledDialogTitle>
        <StyledDialogContent>
          {!showSubcategories ? (
            <>
              <DialogContentText>
                업종 클릭 시 업종을 세부적으로 볼 수 있습니다.
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
              {/* 선택 된 아이템들 표시 */}
              <SelectedSubcategories>
                {Object.entries(allSelectedSubcategories).map(
                  ([category, subcategories]) =>
                    subcategories.map((subcategory) => (
                      <SubcategoryChip
                        key={`${category}-${subcategory}`}
                        onClick={() => {
                          // 선택된 서브 카테고리를 제거하는 함수를 호출
                          handleRemoveSubcategory(category, subcategory);
                        }}
                      >
                        {subcategory}
                      </SubcategoryChip>
                    ))
                )}
              </SelectedSubcategories>
              <SubcategoryList>
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
              </SubcategoryList>
              <Button onClick={handleGoBack}>이전으로</Button>
            </>
          )}
        </StyledDialogContent>
        <DialogActions>
          {/* {!showSubcategories && (
            <Button onClick={handleClose} color="primary">
              닫기
            </Button>
          )} */}
          {!showSubcategories && (
            <Button onClick={handleSearch} color="primary">
              적용
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
