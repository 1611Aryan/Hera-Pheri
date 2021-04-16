import { useUser } from "./Context/userProvider";
import { Route, Redirect, useHistory } from "react-router-dom";
import { useAdmin } from "./Context/adminProvider";
import { useToken } from "./Context/tokenProvider";
import axios from "axios";

export const NormalRoute: React.FC<{
  children: JSX.Element;
  path: string;
  exact?: boolean;
}> = props => {
  //URL
  const URL =
    process.env.NODE_ENV === "production"
      ? "/team/authenticate"
      : "http://localhost:5000/team/authenticate";

  const { token, setToken } = useToken();
  const { setUser } = useUser();

  const history = useHistory();

  const verify = async () => {
    if (token) {
      try {
        const res = await axios.post(
          URL,
          {},
          { headers: { authToken: token } }
        );
        if (res.data.auth) {
          setUser(res.data.team);
          history.push("/dashboard");
        } else {
          setToken(null);
          return false;
        }
      } catch (err) {
        console.log(err);
      }
    } else return false;
  };

  return !verify() ? (
    <Redirect to="/" />
  ) : (
    <Route
      path={props.path}
      exact={props.exact}
      render={() => props.children}
    />
  );
};

export const UserRoute: React.FC<{
  children: JSX.Element;
  path: string;
  exact?: boolean;
}> = props => {
  const { user } = useUser();

  return user ? (
    <Route
      path={props.path}
      exact={props.exact}
      render={() => props.children}
    />
  ) : (
    <Redirect to="/" />
  );
};

export const AdminRoute: React.FC<{
  children: JSX.Element;
  path: string;
  exact?: boolean;
}> = props => {
  const { admin } = useAdmin();
  return admin ? (
    <Route
      path={props.path}
      exact={props.exact}
      render={() => props.children}
    />
  ) : (
    <Redirect to="/admin" />
  );
};
