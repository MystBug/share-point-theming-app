import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import ThemeTable from "./components/ThemeTable";
import { DeleteThemeDialog, ManualThemeDialog } from "./components/Dialogs";
import CustomAlert from "./components/CustomAlert";

interface Props {}
interface State {}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
              <CustomAlert />
              <Box sx={{ flexGrow: 1 }}>
                <Grid container direction="column">
                  <Grid item>
                    <DeleteThemeDialog />
                    <ManualThemeDialog />
                  </Grid>
                  <Grid item>
                    <ThemeTable />
                  </Grid>
                </Grid>
              </Box>
      </div>
    );
  }
}

export default App;
