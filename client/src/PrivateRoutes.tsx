import { useUser } from "./Context/userProvider";
import { Route, Redirect } from "react-router-dom";

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
    <Redirect to="/login" />
  );
};
