import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AdminProvider } from "./Context/adminProvider";
import { UserProvider } from "./Context/userProvider";
import GlobalStyle from "./GlobalStyle";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <AdminProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </AdminProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
