import React, { useContext } from "react";

import Alert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

import { AlertContext } from "../../context/alert.context";

const CustomAlert = () => {
  const { alert, setAlert } = useContext(AlertContext);

  return (
    <Collapse in={alert.show}>
      <Alert
        severity={alert.variant}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setAlert({ ...alert, show: false });
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <AlertTitle>{alert.title}</AlertTitle>
        {alert.content}
      </Alert>
    </Collapse>
  );
};

export default CustomAlert;
