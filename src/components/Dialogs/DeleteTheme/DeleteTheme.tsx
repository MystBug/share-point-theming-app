import React, { useContext, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { deleteTheme } from "../../../utils/themeRequest";
import { AlertContext } from "../../../context/alert.context";
import { ThemeDataContext } from "../../../context/themeData.context";
import { AppStateContext } from "../../../context/app.context";
import { Typography } from "@mui/material";

const DeleteThemeDialog = () => {
  const { setAlert } = useContext(AlertContext);
  const { currentThemeData, deleteCurrentThemeDataWithThemeName } = useContext(ThemeDataContext);
  const { setCurrentAppState } = useContext(AppStateContext);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (!inputValue) return; // We might want to notify the user that he can not post an empty string
    const foundThemeWithName = currentThemeData.themePreviews.filter((theme) => theme.name === inputValue);
    if (foundThemeWithName.length === 0) {
      // This does the same as handling the error in `deleteTheme` but preventing
      // to make a call to the API in the first place
      setAlert({
        show: true,
        variant: "warning",
        title: "",
        content: `"${inputValue}" is not uploaded in Share Point!`,
      });
      return;
    }

    setCurrentAppState({ state: "LOADING" });
    deleteTheme({ name: inputValue })
      .then(() => {
        setCurrentAppState({ state: "LOADED" });
        setAlert({
          show: true,
          variant: "success",
          title: "Success!",
          content: `Successfully removed ${inputValue}`,
        });
        deleteCurrentThemeDataWithThemeName(inputValue);
      })
      .catch(() => {
        setCurrentAppState({ state: "LOADED" });
        setAlert({
          show: true,
          variant: "error",
          title: "Error",
          content: <>
            <Typography variant="body2" gutterBottom>
                Can not delete theme that is not present in Share Point
            </Typography>
            <Typography variant="body2">
              Are you sure "{inputValue}" is in the list<br/>
              Did you also check if "{inputValue}" is in the Share Point custom theme list?
            </Typography>
          </>,
        });
      });
    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="outlined" sx={{ m: 2 }} onClick={handleClickOpen}>
        <DeleteOutlineIcon sx={{mr: 1}} />theme
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new theme</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the exact theme name that you want to remove! Like:
            <br />
            "Sounders Rave Green"
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="theme-name"
            label="Theme name"
            type="text"
            fullWidth
            required
            variant="standard"
            placeholder="e.g.: 'Sounders Rave Green'"
            onChange={(e) => setInputValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!inputValue}>Delete theme</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteThemeDialog;
