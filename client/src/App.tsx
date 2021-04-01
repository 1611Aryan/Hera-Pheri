import { Switch, Route } from "react-router-dom";
import { UserRoute } from "./PrivateRoutes";
import Dashboard from "./Components/Dashboard";
import Error from "./Components/Error";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Nav from "./Components/Nav";
import Register from "./Components/Register";

const App = () => {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <UserRoute path="/dashboard" exact>
          <Dashboard />
        </UserRoute>
        <Route path="/">
          <Error />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
