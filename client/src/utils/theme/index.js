import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import colors from "./colors";
import typography from "./typography";
import spacing from "./spacing";

// import "./fonts/fonts.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#201751", // Midnight
      light: "#00A9CE", // Cyan
      dark: "#0057A3", // blue
    },
    secondary: {
      main: "#D91473", // Pink
      dark: "#5E2E86", // Purple
      light: "#FFC709", // yellow
    },
  },
  colors: {
    ...colors,
  },
  spacing: [...spacing],
  ...typography,
});

export default theme;