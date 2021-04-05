import React, { useContext, createContext } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";

interface user {
  user: {
    teamName: string;
    joinCode: string;
    leader: {
      name: string;
      email: string;
      number: string;
    };
    members: { name: string; email: string; number: string }[];
    password: string;
    _id: string;
  } | null;
  setUser: React.Dispatch<
    React.SetStateAction<{
      teamName: string;
      joinCode: string;
      leader: {
        name: string;
        email: string;
        number: string;
      };
      members: {
        name: string;
        email: string;
        number: string;
      }[];
      password: string;
      _id: string;
    } | null>
  >;
}

const UserContext = createContext<user>({
  user: null,
  setUser: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
