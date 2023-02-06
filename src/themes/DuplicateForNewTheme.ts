import { themeType } from "../types/themeType";

export const customGreen: themeType = {
  name: "Change_Me",
  themeJson: {
    palette: {
      /** theme color options */
      themeDarker: "#fff000",
      themeDark: "#c1141a",
      themeDarkAlt: "#00ff00",
      themePrimary: "#7ee23b",
      themeSecondary: "#c0d6e4",

      neutralTertiary: "#ff8c00",
      // Default #fff (in dark theme(?)) | Devider border (on all background colors)
      neutralTertiaryAlt: "#ffc0cb",
      neutralSecondary: "#f08080",
      neutralSecondaryAlt: "#9acd32",
      neutralPrimary: "#b8860b",
      neutralPrimaryAlt: "#008b8b",
      // Hover buttons with icon and white/black text
      neutralDark: "#bdb76b",
      /** end theme color options */

      /** Page background: */
      white: "#556b2f",
      // I.e. sidebar color
      neutralLighter: "#733337",
      // Section background shading: soft
      themeLighterAlt: "#99588a",
      /** end Page background */

      // Page borders
      neutralLight: "#133331",
      // Background "monospaced" block
      neutralLighterAlt: "#bb9955",
      // "Change the look" text
      black: "#8b008b",
      // Collapsible dropdown active hover
      neutralQuaternaryAlt: "#90ee90",
      // Left sidebar "create" button borders
      neutralQuaternary: "#8b0000",
      // Button active
      themeLighter: "#df6d4f",
      // Background in Teams
      primaryBackground: "#9932cc",
      // Light background-color (in sections)
      themeTertiary: "#f7931a",
      // Part of the loading icon
      themeLight: "#8444ff",

      error: "#8fbc8f",
      primaryText: "#e9967a",
      accent: "#483d8b",
      bodyBackground: "#2f4f4f",
      bodyText: "#00ced1",
      disabledBackground: "#8a2be2",
      disabledText: "#663399",
    },
  },
};
