import { Switch, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Error from "./Components/Error";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Nav from "./Components/Nav";
import Register from "./Components/Register";
import CreateTeam from "./Components/Register/CreateTeam";
import JoinTeam from "./Components/Register/JoinTeam";

const App = () => {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/join/:code?" exact>
          <JoinTeam />
        </Route>
        <Route path="/create" exact>
          <CreateTeam />
        </Route>
        <Route path="/dashboard" exact>
          <Dashboard />
        </Route>
        <Route path="/">
          <Error />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
