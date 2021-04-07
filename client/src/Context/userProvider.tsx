import React, { useContext, createContext } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";

interface user {
  user: {
    _id: string;
    teamName: string;
    joinCode: string;
    set: string;
    score: number;
    hints: number;
    leader: {
      name: string;
      email: string;
      number: string;
    };
    members: { name: string; email: string; number: string }[];
    password: string;
    answers: boolean[];
  } | null;
  setUser: React.Dispatch<
    React.SetStateAction<{
      _id: string;
      teamName: string;
      joinCode: string;
      set: string;
      score: number;
      hints: number;
      leader: {
        name: string;
        email: string;
        number: string;
      };
      members: { name: string; email: string; number: string }[];
      password: string;
      answers: boolean[];
    } | null>
  >;
  setScore: (i: number) => void;
  setAnswer: (i: number) => void;
}

const UserContext = createContext<user>({
  user: null,
  setUser: () => {},
  setScore: (i: number) => {},
  setAnswer: (i: number) => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);

  const setScore = (i: number) => {
    setUser({ ...user, score: i });
  };

  const setAnswer = (i: number) => {
    const newAnswers = user.answers;
    newAnswers[i] = true;

    setUser({ ...user, answers: newAnswers });
  };

  return (
    <UserContext.Provider value={{ user, setUser, setScore, setAnswer }}>
      {children}
    </UserContext.Provider>
  );
};
