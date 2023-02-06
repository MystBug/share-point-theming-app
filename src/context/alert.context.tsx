import React, { createContext, Dispatch, useState } from "react";

import { AlertColor } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

type Alert = {
  show: boolean;
  variant: AlertColor;
  title?: string;
  content: string;
};

const initialState: Alert = {
  show: false,
  variant: "info",
  title: "",
  content: "",
};

// Actual value you want to access
export const AlertContext = createContext({
  alert: initialState,
  setAlert: (() => {}) as Dispatch<any>,
});

export const AlertProvider: React.FC<Props> = ({ children }) => {
  const [alert, setAlert] = useState(initialState);

  const value = { alert, setAlert };

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};
