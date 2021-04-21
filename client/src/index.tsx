import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AdminProvider } from "./Context/adminProvider";
import { LoaderProvider } from "./Context/loaderProvider";
import { TokenProvider } from "./Context/tokenProvider";
import { UserProvider } from "./Context/userProvider";
import GlobalStyle from "./GlobalStyle";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <AdminProvider>
        <TokenProvider>
          <UserProvider>
            <LoaderProvider>
              <App />
            </LoaderProvider>
          </UserProvider>
        </TokenProvider>
      </AdminProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
