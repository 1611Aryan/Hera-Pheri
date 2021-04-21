import React, { useContext, createContext, useState } from "react";

interface loader {
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoaderContext = createContext<loader>({
  loader: false,
  setLoader: () => {},
});

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  const [loader, setLoader] = useState(true);

  return (
    <LoaderContext.Provider value={{ loader, setLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};
