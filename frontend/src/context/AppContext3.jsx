import React, { createContext, useState } from 'react';

export const AppContext3 = createContext();

export const AppContextProvider = ({ children }) => {
  const [state, setState] = useState({});

  return (
    <AppContext3.Provider value={{ state, setState }}>
      {children}
    </AppContext3.Provider>
  );
};