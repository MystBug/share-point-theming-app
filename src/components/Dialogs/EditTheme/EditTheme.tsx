import React, { useContext, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

import EditIcon from "@mui/icons-material/Edit";

import { themeType } from "../../../types/themeType";

import ColorRow from "./ColorRow";

interface Props {
  children?: React.ReactNode;
  title?: string;
  theme: themeType;
  onClose: (inputValue: themeType) => {};
}

const EditThemeDialog: React.FC<Props> = ({ title, theme, onClose }) => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose(inputValue);
    handleClose();
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      themeJson: {
        palette: {
          ...inputValue.themeJson!.palette,
          [event.target.name]: event.target.value,
        },
      },
    });
  };

  const setInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      name: event?.target.value,
    });
  };

  return (
    <React.Fragment>
      <Button title={title && title} onClick={handleClickOpen}>
        <EditIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Edit a theme</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Below you will see a big list of colors and their names. The names
              are used in Share Point to set the color that is chosen in the
              black box.
              <br />
              <br />
              Give it a try and change the color of "themeDarker"!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="theme-name"
              label="Theme name"
              type="text"
              fullWidth
              required
              disabled
              sx={{ marginBottom: 2 }}
              variant="standard"
              placeholder="e.g.: 'Sounders Rave Green'"
              defaultValue={inputValue.name}
              onChange={setInputName}
            />
            <TableContainer component={Paper}>
              <Table sx={{ width: "100%" }} aria-label="simple table">
                <TableBody>
                  {Object.entries(inputValue.themeJson!.palette).map((item) => (
                    <ColorRow
                      key={item[0]}
                      color={item}
                      handleBlur={handleBlur}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" disabled={!inputValue.name}>
              Upload theme
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default EditThemeDialog;
