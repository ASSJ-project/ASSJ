import React, { useState } from 'react';
import { Button, List, ListItem, ListItemText, Box } from '@mui/material';
import styled from 'styled-components';
import json from '@/libs/json/job_code.json';
import Modal from '@mui/material/Modal';
import { Chip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setFilterJob } from '@/actions/dataFilterActions';

/* ListWrapper와 SubListWrapper에 공통 스타일 추가 */
const ScrollbarStyles = `
  &::-webkit-scrollbar {
    width: 0.3em;
    height: 0.3em;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 16px;
  border-top: 1px solid grey;
`;

const ListWrapper = styled(List)`
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 40%;
  max-height: 400px; // Remove comment
  overflow-y: auto; // Remove comment

  ${ScrollbarStyles}/* 스크롤바 스타일 적용 */
`;

const ListItemStyled = styled(ListItem)`
  flex-basis: 100%;
  background-color: #f0f0f0;

  &.selected {
    background-color: #fff;
  }

  .list-item-text {
    color: ${({ isSelected }) => (isSelected ? '#4876ef' : 'initial')};
  }
`;

const SubListWrapper = styled(List)`
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 60%;
  max-height: 400px; // Add max height
  overflow-y: auto; // Add overflow-y

  ${ScrollbarStyles}/* 스크롤바 스타일 적용 */
`;

const SubListItemStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-basis: 100%;
  padding: 8px 16px;
  cursor: pointer;

  span {
    color: ${({ isChecked }) => (isChecked ? '#4876ef' : 'initial')};
  }
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  max-height: 80%;
  overflow-y: hidden;
  background-color: #fff;
  border: 2px solid 000;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  padding: 20px 0px 0px 0px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const CheckBox = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-left: 8px;
  border: ${({ isChecked }) =>
    isChecked ? '1px solid transparent' : '1px solid #fff'};
  border-radius: 3px;
  background-color: ${({ isChecked }) => (isChecked ? 'transparent' : '#fff')};
  position: relative;
`;
const CheckMark = styled.span`
  border-bottom: ${({ isChecked }) =>
    isChecked ? '2px solid #4876ef' : '1px solid #d6d6cd'};
  border-right: ${({ isChecked }) =>
    isChecked ? '2px solid #4876ef' : '1px solid #d6d6cd'};
  width: 5px;
  height: 10px;
  transform: rotate(45deg);
  position: absolute;
  top: 2px;
  left: 5px;
`;

const AutoComplete = styled.div`
  background-color: white;
  padding: 5px;
  border-top-left-radius: 12px;
  box-shadow: 0 -2px 16px 0 rgba(0, 0, 0, 0.12);
  overflow-y: auto;
`;

const AutoCompleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
  background-color: white;
  padding: 20px 10px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  box-shadow: 0 -2px 16px 0 rgba(0, 0, 0, 0.12);
  overflow-y: auto;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;

const SelectAllButton = styled(SubListItemStyled)`
  font-weight: bold;
`;

const data = json;

export default function JobFilter() {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedSubItems, setSelectedSubItems] = useState({});
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedSubItemIds, setSelectedSubItemIds] = useState([]); // Add this line

  const [isAllSelected, setIsAllSelected] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClick = (item) => {
    if (selectedItem !== item) {
      setIsAllSelected(false);
    }
    setSelectedItem(item);
  };
  const handleSubItemClick = (subItemId, subJob) => {
    setSelectedSubItems((prev) => ({
      ...prev,
      [subItemId]: !prev[subItemId],
    }));
    if (selectedJobs.includes(subJob)) {
      setSelectedJobs(selectedJobs.filter((job) => job !== subJob));
    } else {
      setSelectedJobs([...selectedJobs, subJob]);
    }
    if (selectedSubItemIds.includes(subItemId)) {
      setSelectedSubItemIds(
        selectedSubItemIds.filter((id) => id !== subItemId)
      );
    } else {
      setSelectedSubItemIds([...selectedSubItemIds, subItemId]);
    }
  };

  const handleSelectAll = () => {
    setIsAllSelected((prevIsAllSelected) => {
      const newIsAllSelected = !prevIsAllSelected;
      const newSelectedSubItems = { ...selectedSubItems };
      const newSelectedJobs = [...selectedJobs];
      const newSelectedSubItemIds = [...selectedSubItemIds];

      if (newIsAllSelected) {
        // 전체 선택
        selectedItem.subcategories.forEach((sub) => {
          if (!newSelectedSubItems[sub.id]) {
            newSelectedSubItems[sub.id] = true;
            newSelectedJobs.push(sub.subcategories);
            newSelectedSubItemIds.push(sub.id);
          }
        });
      } else {
        // 전체 선택 해제
        selectedItem.subcategories.forEach((sub) => {
          if (newSelectedSubItems[sub.id]) {
            newSelectedSubItems[sub.id] = false;
            newSelectedJobs.splice(
              newSelectedJobs.indexOf(sub.subcategories),
              1
            );
            newSelectedSubItemIds.splice(
              newSelectedSubItemIds.indexOf(sub.id),
              1
            );
          }
        });
      }

      setSelectedSubItems(newSelectedSubItems);
      setSelectedJobs(newSelectedJobs);
      setSelectedSubItemIds(newSelectedSubItemIds);
      return newIsAllSelected;
    });
  };

  const handleDelete = (jobToDelete) => {
    setSelectedJobs((prevJobs) =>
      prevJobs.filter((job) => job !== jobToDelete)
    );

    // selectedSubItems 업데이트
    const subItemIdToDelete = Object.entries(selectedSubItems).find(
      ([subItemId, isChecked]) => {
        const subItem = selectedItem.subcategories.find(
          (sub) => sub.subcategories === jobToDelete
        );
        return isChecked && subItem && subItemId === subItem.id;
      }
    )?.[0];

    if (subItemIdToDelete) {
      setSelectedSubItems((prevSubItems) => ({
        ...prevSubItems,
        [subItemIdToDelete]: false,
      }));
      setSelectedSubItemIds(
        selectedSubItemIds.filter((id) => id !== subItemIdToDelete)
      );
    }
  };

  console.log(selectedSubItemIds);

  const handleReset = () => {
    const resetSubItems = {};
    Object.keys(selectedSubItems).forEach((key) => {
      resetSubItems[key] = false;
    });
    setSelectedSubItems(resetSubItems);
    setSelectedJobs([]);
    setSelectedSubItemIds([]);
  };

  return (
    <>
      {selectedJobs.length === 0 ? (
        <Button
          variant="outlined"
          onClick={handleOpen}
          style={{ borderRadius: '12px' }}
        >
          지역
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={handleOpen}
          style={{ borderRadius: '12px' }}
        >
          {selectedJobs[0]} 외 {selectedJobs.length - 1} 건
        </Button>
      )}
      <Modal open={open} onClick={handleClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <div style={{ textAlign: 'center' }}>업종</div>
          <Container>
            <ListWrapper>
              {data.map((item) => (
                <ListItemStyled
                  key={item.id}
                  onClick={() => handleClick(item)}
                  className={
                    selectedItem && selectedItem.id === item.id
                      ? 'selected'
                      : ''
                  }
                  isSelected={selectedItem && selectedItem.id === item.id}
                >
                  <ListItemText
                    primary={item.name}
                    className="list-item-text"
                  />
                </ListItemStyled>
              ))}
            </ListWrapper>
            {selectedItem && (
              <SubListWrapper>
                <SelectAllButton
                  onClick={() => handleSelectAll()}
                  isChecked={isAllSelected}
                >
                  <span>전체 선택</span>
                  <CheckBox isChecked={isAllSelected}>
                    <CheckMark isChecked={isAllSelected} />
                  </CheckBox>
                </SelectAllButton>
                {selectedItem.subcategories.map((sub) => (
                  <SubListItemStyled
                    key={sub.id}
                    onClick={() =>
                      handleSubItemClick(sub.id, sub.subcategories)
                    }
                    isChecked={selectedSubItems[sub.id]}
                  >
                    <span>{sub.subcategories}</span>
                    <CheckBox isChecked={selectedSubItems[sub.id]}>
                      <CheckMark isChecked={selectedSubItems[sub.id]} />
                    </CheckBox>
                  </SubListItemStyled>
                ))}
              </SubListWrapper>
            )}
          </Container>
          <AutoCompleteWrapper>
            <AutoComplete>
              {selectedJobs.length > 0 ? (
                selectedJobs.map((job, index) => (
                  <Chip
                    key={index}
                    label={job}
                    style={{
                      marginRight: 8,
                      marginBottom: 8,
                      backgroundColor: '#e3f2fd',
                    }}
                    onDelete={() => handleDelete(job)}
                  />
                ))
              ) : (
                <span style={{ color: 'grey' }}>업종을 선택해주세요</span>
              )}
            </AutoComplete>
            <ButtonWrapper>
              <Button variant="outlined" onClick={handleReset}>
                초기화
              </Button>
              <Button
                variant="contained"
                style={{ width: '200px' }}
                onClick={() => {
                  handleClose();
                  dispatch(setFilterJob(selectedSubItemIds.join(', ')));
                }}
              >
                적용
              </Button>
            </ButtonWrapper>
          </AutoCompleteWrapper>
        </ModalContent>
      </Modal>
    </>
  );
}
