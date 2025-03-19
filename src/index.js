import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStylesDefault from "./Components/GlobalStyles/GlobalStyles";
import ThemesProvider from "./contexts/ThemeProvider/Theme_Provider";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./contexts/ThemeProviderMUI/Theme";
import { CssBaseline, GlobalStyles } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <GlobalStylesDefault>
      <ThemesProvider>
        <CssBaseline />
        <GlobalStyles
          styles={{
            "*": {
              fontFamily: "'Poppins', sans-serif", // Áp dụng cho mọi thẻ HTML
            },
          }}
        />
        <App />
      </ThemesProvider>
    </GlobalStylesDefault>
  </ThemeProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
