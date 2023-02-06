import React, { createContext, Dispatch, useState } from "react";

interface Props {
  children: React.ReactNode;
}

type STATUS = "LOADING" | "ERROR" | "LOADED";

type AppState = {
  state: STATUS;
};

const initialState: AppState = {
    state: "LOADING",
}

// Actual value you want to access
export const AppStateContext = createContext({
  currentAppState: initialState,
  setCurrentAppState: (() => {}) as Dispatch<any>,
});

export const AppStateProvider: React.FC<Props> = ({ children }) => {
  const [currentAppState, setCurrentAppState] = useState(initialState);

  const value = { currentAppState, setCurrentAppState };

  return (
    <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
  );
};
