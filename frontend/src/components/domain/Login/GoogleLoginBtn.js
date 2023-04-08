import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import GoogleImg from "../../../assets/images/googlebtn.png";
import { snsLoginDo } from "@/apis/login/sns_login";
import { snsRegisterDo } from "@/apis/register/snsRegister";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import "@/components/domain/Login/LoginPage.css";

export default function GoogleLoginBtn() {
  const clientId =
    "425382057029-f821f5ddsd40pnji9uvpj3u1ndipaoq1.apps.googleusercontent.com";
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
    });
  }, []);

  const responseGoogle = (response) => {
    if (response) {
      snsLoginDo(response.googleId).then((result) => {
        setId(response.googleId);
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
        구글 계정으로 가입하시겠습니까?
      </Typography>
      <Typography id="modal-description" sx={{ mt: 2 }}>
        구글 계정으로 가입하시려면 가입 버튼을 눌러주세요.
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
      <GoogleLogin
        clientId={clientId}
        render={(renderProps) => (
          <img
            src={GoogleImg}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={{ marginRight: 10 }}
          />
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
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
