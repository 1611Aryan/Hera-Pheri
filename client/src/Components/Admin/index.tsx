import { Route, Switch } from "react-router";
import { AdminRoute } from "../../PrivateRoutes";
import Dashboard from "./Dashboard";
import Login from "./Login";

const Admin = () => {
  return (
    <Switch>
      <Route path="/admin" exact>
        <Login />
      </Route>
      <AdminRoute path="/admin/dashboard">
        <Dashboard />
      </AdminRoute>
    </Switch>
  );
};

export default Admin;
