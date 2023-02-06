import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneIcon from "@mui/icons-material/Done";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { soundersRaveGreen } from "../../themes";
import { postTheme, deleteTheme, updateTheme } from "../../utils/themeRequest";
import { themeType } from "../../types/themeType";
import LoadingSplash from "../../containers/LoadingSplash";

import { ThemeDataContext } from "../../context/themeData.context";
import { AppStateContext } from "../../context/app.context";
import { AlertContext } from "../../context/alert.context";
import EditThemeDialog from "../Dialogs/EditTheme/EditTheme";

const ThemeTable = () => {
  const { currentThemeData, setCurrentThemeData } =
    useContext(ThemeDataContext);
  const { currentAppState, setCurrentAppState } = useContext(AppStateContext);
  const { setAlert } = useContext(AlertContext);

  if (currentAppState.state === "ERROR")
    setAlert({
      show: true,
      variant: "error",
      title: "Something went wrong",
      content: "Definitly",
    });
  if (currentAppState.state === "LOADING") return <LoadingSplash show={true} />;

  const handlePost = (theme: themeType) => {
    try {
      setCurrentAppState({ state: "LOADING" });
      postTheme(theme).then((response) => {
        if (response.status === 200) {
          setAlert({
            show: true,
            variant: "success",
            title: "Success!",
            content: `The theme with "${theme.name}" is successfully added`,
          });

          console.log([...currentThemeData.themePreviews, theme]);

          setCurrentThemeData({
            themePreviews: currentThemeData.themePreviews
              ? [...currentThemeData.themePreviews, theme]
              : theme,
          });
          setCurrentAppState({ state: "LOADED" });
        } else {
          setAlert({
            show: true,
            variant: "error",
            title: response.statusText,
            content: `Uploading "${theme.name}" did not work`,
          });
        }
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleEdit = async (theme: themeType) => {
    try {
      setCurrentAppState({ state: "LOADING" });
      updateTheme(theme).then((response) => {
        if (response.status === 200) {
          setAlert({
            show: true,
            variant: "success",
            title: "Success!",
            content: (
              <Typography variant="body2">
                The theme with "{theme.name}" is successfully updated
                <br />
                <i>
                  <strong>Note:</strong> SharePoint is not automatically updated
                </i>
                .
              </Typography>
            ),
          });

          setCurrentThemeData({
            themePreviews: [
              ...currentThemeData.themePreviews.map((themePreview) => {
                if (themePreview.name === theme.name) {
                  return theme;
                } else {
                  return themePreview;
                }
              }),
            ],
          });
          setCurrentAppState({ state: "LOADED" });
        } else {
          setAlert({
            show: true,
            variant: "error",
            title: response.statusText,
            content: `Uploading "${theme.name}" did not work`,
          });
        }
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleDelete = (name: string) => {
    try {
      setCurrentAppState({ state: "LOADING" });
      deleteTheme({ name }).then((response) => {
        if (response.status === 204) {
          setCurrentAppState({ state: "LOADED" });
          setAlert({
            show: true,
            variant: "success",
            title: "Success!",
            content: `The theme with "${name}" is successfully removed`,
          });

          const cur = currentThemeData.themePreviews;
          setCurrentThemeData({
            themePreviews: cur ? cur.filter((item) => item.name !== name) : [],
          });
        } else {
          setCurrentAppState({ state: "LOADED" });
          setAlert({
            show: true,
            variant: "error",
            title: response.statusText,
            content: `Deleting "${name}" did not work`,
          });
        }
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleDuplicate = (theme: themeType) => {
    theme.name = `${theme.name} - copy`;
    handlePost(theme);
  };

  const tableRows = [
    {
      key: soundersRaveGreen.name,
      palette: soundersRaveGreen,
      present: false,
      isDefault: true,
    },
  ];

  // Merge currentThemeData with tableRows
  currentThemeData.themePreviews.forEach((themePreview) => {
    let hit = false;
    tableRows.map((tableRow) => {
      if (tableRow.palette.name === themePreview.name) {
        tableRow.present = true;
        hit = true;
        tableRow.palette = themePreview;
      }
      return tableRow;
    });

    if (hit) return;
    tableRows.push({
      key: themePreview.name,
      palette: themePreview,
      present: true,
      isDefault: false,
    });
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell title="If checked, this can be found in SharePoint">
              <strong>Live</strong>
            </TableCell>
            <TableCell>
              <strong>Theme name</strong>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows.map((row) => (
            <TableRow key={row.key}>
              <TableCell>
                {row.present ? <DoneIcon sx={{ color: "#ffe000" }} /> : <></>}
              </TableCell>
              <TableCell>
                {row.isDefault ? row.palette.name : <i>{row.palette.name}</i>}
              </TableCell>
              <TableCell align="right">
                <EditThemeDialog
                  title="Edit; change the theme"
                  theme={row.palette}
                  onClose={handleEdit}
                />
                <Button
                  title="Duplicate; will receive the suffix of '- copy'"
                  onClick={() => handleDuplicate(row.palette)}
                >
                  <ContentCopyIcon />
                </Button>
                {row.present ? (
                  <Button
                    title="Remove theme from SharePoint"
                    onClick={() => handleDelete(row.palette.name)}
                  >
                    <DeleteOutlineIcon />
                  </Button>
                ) : (
                  <Button
                    title="Upload theme to SharePoint"
                    onClick={() => handlePost(row.palette)}
                  >
                    <UploadFileIcon />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ThemeTable;
