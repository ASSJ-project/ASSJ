import React, { useState } from 'react';
import { Button, List, ListItem, ListItemText, Box } from '@mui/material';
import styled from 'styled-components';
import json from '@/libs/json/region_code.json';
import Modal from '@mui/material/Modal';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ListWrapper = styled(List)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0;
  width: 50%;
`;

const ListItemStyled = styled(ListItem)`
  flex-basis: 100%;
`;

const SubListWrapper = styled(List)`
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 50%;
`;

const SubListItemStyled = styled(ListItem)`
  flex-basis: 100%;
`;

const data = json;

export default function AddressSelect() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container>
            <ListWrapper>
              {data.map((item) => (
                <ListItemStyled
                  key={item.id}
                  button
                  onClick={() => handleClick(item)}
                >
                  <ListItemText primary={item.name} />
                </ListItemStyled>
              ))}
            </ListWrapper>
            {selectedItem && (
              <SubListWrapper>
                {selectedItem.subcategories.map((sub) => (
                  <SubListItemStyled key={sub.id}>
                    <ListItemText primary={sub.region} />
                  </SubListItemStyled>
                ))}
              </SubListWrapper>
            )}
          </Container>
        </Box>
      </Modal>
    </>
  );
}
