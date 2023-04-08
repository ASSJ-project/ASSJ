import React, { useState } from "react";
import KakaoLogin from "react-kakao-login";
import KakaoImg from "../../../assets/images/kakaobtn.png";
import { snsLoginDo } from "@/apis/login/sns_login";
import { snsRegisterDo } from "@/apis/register/snsRegister";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function KakaoLoginBtn() {
  const clientId = "5308bfd7191289f8e5ccd2c1224835eb";
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const responseKakao = (response) => {
    if (response) {
      snsLoginDo(response.profile.id).then((result) => {
        setId(response.profile.id);
        if (result) handleClose();
        else {
          handleOpen();
        }
      });
    } else {
      handleClose();
    }
  };

  const modalBody = (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography id="modal-title" variant="h6" component="h2">
        카카오 계정으로 가입하시겠습니까?
      </Typography>
      <Typography id="modal-description" sx={{ mt: 2 }}>
        카카오 계정으로 가입하시려면 가입 버튼을 눌러주세요.
      </Typography>
      <Button onClick={handleClose} sx={{ mt: 2 }}>
        닫기
      </Button>
      <Button onClick={() => snsRegisterDo(id)} sx={{ mt: 2 }}>
        가입
      </Button>
    </Box>
  );

  return (
    <>
      <KakaoLogin
        token={clientId}
        render={(renderProps) => (
          <img
            src={KakaoImg}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={{ marginRight: 10 }}
          />
        )}
        onSuccess={responseKakao}
        onFailure={responseKakao}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {modalBody}
      </Modal>
    </>
  );
}
