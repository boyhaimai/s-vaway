import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyles from "./Components/GlobalStyles/GlobalStyles";
import ThemesProvider from "./Components/ThemeProvider/Theme_Provider";
import { ThemeProvider } from '@mui/material/styles';
import theme from "./Components/ThemeProviderMUI/Theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles>
        <ThemesProvider>
          <App />
        </ThemesProvider>
      </GlobalStyles>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
