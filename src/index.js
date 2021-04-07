import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import store from "./store";
const theme = createMuiTheme({
  palette: {
    primary: { main: "#f7f3e9" },
    secondary: { main: "#f1356d" },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
