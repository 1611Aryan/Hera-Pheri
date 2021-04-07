import { Switch, Route } from "react-router-dom";
import { UserRoute } from "./PrivateRoutes";
import Dashboard from "./Components/Dashboard";
import Error from "./Components/Error";
import Login from "./Components/Login";
import Admin from "./Components/Admin";
import Nav from "./Components/Nav";
import Register from "./Components/Register";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <UserRoute path="/dashboard" exact>
          <Dashboard />
        </UserRoute>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/">
          <Error />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
