export type themeType = {
  name: string;
  themeJson?: {
    palette: {
      [key:string]: string;
      themePrimary: string;
      themeLighterAlt: string;
      themeLighter: string;
      themeLight: string;
      themeTertiary: string;
      themeSecondary: string;
      themeDarkAlt: string;
      themeDark: string;
      themeDarker: string;
      neutralLighterAlt: string;
      neutralLighter: string;
      neutralLight: string;
      neutralQuaternaryAlt: string;
      neutralQuaternary: string;
      neutralTertiaryAlt: string;
      neutralTertiary: string;
      neutralSecondaryAlt: string;
      neutralSecondary: string;
      neutralPrimaryAlt: string;
      neutralPrimary: string;
      neutralDark: string;
      black: string;
      white: string;
      primaryBackground: string;
      primaryText: string;
      bodyBackground: string;
      bodyText: string;
      disabledBackground: string;
      disabledText: string;
      error: string;
      accent: string;
    };
  };
};
