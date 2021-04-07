import { useUser } from "./Context/userProvider";
import { Route, Redirect } from "react-router-dom";
import { useAdmin } from "./Context/adminProvider";

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
