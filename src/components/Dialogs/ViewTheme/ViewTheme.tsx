import React, { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import VisibilityIcon from '@mui/icons-material/Visibility';

import { themeType } from "../../../types/themeType";

interface Props {
  children?: React.ReactNode;
  title?: string;
  theme: themeType;
  onClose: (inputValue: themeType) => {};
}

const ViewThemeDialog: React.FC<Props> = ({ title, theme, onClose }) => {
  let initialState: themeType = {
    name: "",
    themeJson: {
      palette: {
        themePrimary: "#000000",
        themeLighterAlt: "#000000",
        themeLighter: "#000000",
        themeLight: "#000000",
        themeTertiary: "#000000",
        themeSecondary: "#000000",
        themeDarkAlt: "#000000",
        themeDark: "#000000",
        themeDarker: "#000000",
        neutralLighterAlt: "#000000",
        neutralLighter: "#000000",
        neutralLight: "#000000",
        neutralQuaternaryAlt: "#000000",
        neutralQuaternary: "#000000",
        neutralTertiaryAlt: "#000000",
        neutralTertiary: "#000000",
        neutralSecondaryAlt: "#000000",
        neutralSecondary: "#000000",
        neutralPrimaryAlt: "#000000",
        neutralPrimary: "#000000",
        neutralDark: "#000000",
        black: "#000000",
        white: "#000000",
        primaryBackground: "#000000",
        primaryText: "#000000",
        error: "#000000",
        accent: "#000000",
        bodyBackground: "#000000",
        bodyText: "#000000",
        disabledBackground: "#000000",
        disabledText: "#000000",
      },
    },
  };

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(initialState);

  const handleClickOpen = () => {
    if (theme) {
      let retrievedTheme: themeType = theme;
      if (typeof retrievedTheme.themeJson === "string") {
        retrievedTheme.themeJson = JSON.parse(retrievedTheme.themeJson);
      }
      setInputValue(retrievedTheme);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button title={title && title} onClick={handleClickOpen}>
        <VisibilityIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>View theme</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can copy the content of the box below to create your theme
            locally.
          </DialogContentText>
          <pre
            style={{
              whiteSpace: "break-spaces",
              wordWrap: "break-word",
            }}
          >
            {JSON.stringify(inputValue)}
          </pre>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ViewThemeDialog;
