import React, { useContext, createContext } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";

interface admin {
  admin: {
    _id: string;
    name: string;
    auth: string;
    password: string;
  } | null;
  setAdmin: React.Dispatch<
    React.SetStateAction<{
      _id: string;
      name: string;
      auth: string;
      password: string;
    } | null>
  >;
}

const AdminContext = createContext<admin>({
  admin: null,
  setAdmin: () => {},
});

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  const [admin, setAdmin] = useLocalStorage("user", null);

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
