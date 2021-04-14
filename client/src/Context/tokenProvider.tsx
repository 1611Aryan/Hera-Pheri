import React, { useContext, createContext, useEffect } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";

interface token {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const tokenContext = createContext<token>({
  token: null,
  setToken: () => {},
});

export const useToken = () => useContext(tokenContext);

export const TokenProvider: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", null);

  useEffect(() => {
    console.log(token);
  }, [token]);

  return (
    <tokenContext.Provider value={{ token, setToken }}>
      {children}
    </tokenContext.Provider>
  );
};
