import { Switch, Route } from "react-router-dom";
import { NormalRoute, UserRoute } from "./PrivateRoutes";
import Dashboard from "./Components/Dashboard";
import Error from "./Components/Error";
import Login from "./Components/Login";
import Admin from "./Components/Admin";
import Nav from "./Components/Nav";
import Register from "./Components/Register";
import Footer from "./Components/Footer";
import Loader from "./Components/Loader";
import { useLoader } from "./Context/loaderProvider";
import { useEffect } from "react";

const App = () => {
  const { loader, setLoader } = useLoader();

  //
  useEffect(() => {
    setTimeout(() => setLoader(false), 500);
  });
  return (
    <div className="App">
      <Loader />
      <Nav />
      <Switch>
        <NormalRoute path="/" exact>
          <Login />
        </NormalRoute>
        <NormalRoute path="/register">
          <Register />
        </NormalRoute>
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
