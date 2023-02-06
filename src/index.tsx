import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { ThemeDataProvider } from "./context/themeData.context";
import { AppStateProvider } from "./context/app.context";
import { AlertProvider } from "./context/alert.context";

import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const theme = createTheme({
  spacing: 8,
  palette: {
    mode: "dark",
    primary: {
      main: "#ffe000",
      light: "#ffee70",
      dark: "#e0c600",
      contrastText: "#232323",
    },
  },
});
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <AppStateProvider>
          <AlertProvider>
            <ThemeDataProvider>
              <App />
            </ThemeDataProvider>
          </AlertProvider>
        </AppStateProvider>
    </ThemeProvider>
  </React.StrictMode>
);
