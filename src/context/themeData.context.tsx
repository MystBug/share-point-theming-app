import React, { createContext, Dispatch, useEffect } from "react";
import { useState } from "react";
import { themeType } from "../types/themeType";
import { getThemingOptions } from "../utils/themeRequest";
import { AppStateContext } from "./app.context";

interface Props {
  children: React.ReactNode;
}

type ThemeState = {
  themePreviews: themeType[];
};

const initialState: ThemeState = {
  themePreviews: [
    {
      name: "",
      themeJson: {
        palette: {
          themePrimary: "",
          themeLighterAlt: "",
          themeLighter: "",
          themeLight: "",
          themeTertiary: "",
          themeSecondary: "",
          themeDarkAlt: "",
          themeDark: "",
          themeDarker: "",
          neutralLighterAlt: "",
          neutralLighter: "",
          neutralLight: "",
          neutralQuaternaryAlt: "",
          neutralQuaternary: "",
          neutralTertiaryAlt: "",
          neutralTertiary: "",
          neutralSecondary: "",
          neutralSecondaryAlt: "",
          neutralPrimary: "",
          neutralDark: "",
          black: "",
          white: "",
          primaryBackground: "",
          primaryText: "",
          error: "",
          accent: "",
          bodyBackground: "",
          bodyText: "",
          disabledBackground: "",
          disabledText: "",
          neutralPrimaryAlt: "",
        },
      },
    },
  ],
};

// Actual value you want to access
export const ThemeDataContext = createContext({
  currentThemeData: initialState,
  setCurrentThemeData: (() => {}) as Dispatch<any>,
  deleteCurrentThemeDataWithThemeName: (themeName: string) => {},
});

export const ThemeDataProvider: React.FC<Props> = ({ children }) => {
  const { setCurrentAppState } = React.useContext(AppStateContext);

  const [currentThemeData, setCurrentThemeData] = useState(initialState);

  const deleteCurrentThemeDataWithThemeName = (themeName: string) => {
    const newData = currentThemeData.themePreviews.filter((theme) => theme.name !== themeName);
    setCurrentThemeData({
      themePreviews: [...newData]
    })
  };

  const value = { currentThemeData, setCurrentThemeData, deleteCurrentThemeDataWithThemeName };

  useEffect(() => {
    setCurrentAppState({ state: "LOADING" });
    getThemingOptions()
      .then((response) => {
        setCurrentAppState({ state: "LOADED" });
        setCurrentThemeData({
          themePreviews: response.data as themeType[],
        });
      })
      .catch((error) => {
        console.log("Error encountered in ThemeDataProvider", error);
        throw error;
      });
  }, [setCurrentAppState]);

  return (
    <ThemeDataContext.Provider value={value}>
      {children}
    </ThemeDataContext.Provider>
  );
};
