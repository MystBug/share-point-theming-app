# Getting Started

`npm install`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm proxy`

Runs the proxy server which will connect to sharepoint. The proxy will run on [http://localhost:8081](http://localhost:8081).

To make queries to sharepoint you will have to log in with administrator credentials!

- SharePoint URL
- Use `User credentials (SAML/ADFS)`
- User name: the administrator mail adress
- Password: the administrator password

# Themes

## Generating a theme

To generate a team, we have used [Fluent UI Theme Designer](https://fluentuipr.z22.web.core.windows.net/heads/master/theming-designer/index.html). 

> Note: When using the export and placing it in the Theme object in our project, you have to remove `neutralPrimaryAlt` and add these three:

```ts
export const yourThemeName: themeType = {
  name: "Your theme name",
  themeJson: {
    palette: {
      // ...
      primaryBackground: "#1f1f1f",
      primaryText: "#ffffff",
      error: "#ff5f5f",
    },
  },
};
```

### Adding a theme

To add a new theme:

1. Duplicate `src/themes/DuplicateForNewTheme.ts`
2. Rename the file to the name you want your theme to be named
3. Update the import and export in `src/themes/index.ts` with your newly created theme
4. Open `src/components/ThemeTable/ThemeTable.tsx`
5. Import your theme

```ts
import {
  // ...
  changeMeTheme
} from "../../themes";
```

6. Add the theme in the `tableRows` array.
7. Find and replace `change_me` with the new theme name
8. Replace `changeMeTheme` with the exported name from the newly created theme
9. Save the lot, and checkout [http://localhost:3000](http://localhost:3000) to find your "add" and "delete" buttons!
