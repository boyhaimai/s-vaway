import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const Theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light", // Switching the dark mode on
    // primary: {
    //   main: "#556cd6",
    // },
    // secondary: {
    //   main: "#19857b",
    // },
    // error: {
    //   main: red.A400,
    // },
  },
});

export default Theme;
