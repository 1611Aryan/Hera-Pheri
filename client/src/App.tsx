import { Switch, Route } from "react-router-dom";
import { NormalRoute, UserRoute } from "./PrivateRoutes";
import Dashboard from "./Components/Dashboard";
import Error from "./Components/Error";
import Login from "./Components/Login";
import Admin from "./Components/Admin";
import Nav from "./Components/Nav/Nav";
import Register from "./Components/Register";
import Footer from "./Components/Footer";
import Loader from "./Components/Loading/StartLoader";
import { useEffect, useState } from "react";
import Loading from "./Components/Loading/Loading";
import ForgotPassword from "./Components/ForgotPassword";

const App = () => {
  //State
  const [loading, setLoading] = useState(true);

  //Component Did Mount
  useEffect(() => {
    setTimeout(() => setLoading(false), 100);
  });

  return (
    <div className="App">
      <Loader loading={loading} />
      <Loading />
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
        <NormalRoute path="/uh-oh" exact>
          <ForgotPassword />
        </NormalRoute>
        <Route path="/">
          <Error />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
