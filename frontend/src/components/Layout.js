import React from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import ThemeProvider from "../utils/theme";
import Login from "../pages/LoginPage";
import { Message } from "../utils";
import { history } from "../redux/store";
import Dashboard from "../pages/Dashboard";
import Sidebar from "./shared/Sidebar";
import Transaction from "./Transaction";

function Layout() {
  return (
    <ThemeProvider>
      <div className="wrapper">
        <div id="content">
          <ConnectedRouter history={history}>
            <Sidebar />
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/transactions" component={Transaction} />
              <Route path="/login" component={Login} />
            </Switch>
            <Message />
          </ConnectedRouter>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Layout;
