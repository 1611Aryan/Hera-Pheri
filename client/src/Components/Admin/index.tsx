import { useEffect } from "react";
import { Route, Switch } from "react-router";

import { AdminRoute } from "../../PrivateRoutes";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Regsiter from "./Regsiter";

const Admin = () => {
  useEffect(() => {
    document.title = "Chem-i-Leon | Admin";
  }, []);
  return (
    <Switch>
      <Route path="/admin" exact>
        <Login />
      </Route>
      <Route path="/admin/add" exact>
        <Regsiter />
      </Route>
      <AdminRoute path="/admin/dashboard">
        <Dashboard />
      </AdminRoute>
    </Switch>
  );
};

export default Admin;
