import React, { useContext, createContext } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";

interface user {
  user: {
    _id: string;
    teamName: string;
    joinCode: string;
    set: string;
    score: number;
    hints: { type1: number; type2: number; type3: number };
    leader: {
      name: string;
      email: string;
      number: string;
    };
    members: { name: string; email: string; number: string }[];
    password: string;
    ques: number;
  } | null;
  setUser: React.Dispatch<
    React.SetStateAction<{
      _id: string;
      teamName: string;
      joinCode: string;
      set: string;
      score: number;
      hints: { type1: number; type2: number; type3: number };
      leader: {
        name: string;
        email: string;
        number: string;
      };
      members: { name: string; email: string; number: string }[];
      password: string;
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
