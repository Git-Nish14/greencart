"use client";
import { createContext, useContext, useState, ReactNode } from "react";
interface AppContextType {
  user: any;
  setUser: (user: any) => void;
  isSeller: boolean;
  setIsSeller: (isSeller: boolean) => void;
  showUserLogin: boolean;
  setShowUserLogin: (showUserLogin: boolean) => void;
}

export const AppContext = createContext<AppContextType>({
  user: null,
  setUser: () => {},
  isSeller: false,
  setIsSeller: () => {},
  showUserLogin: false,
  setShowUserLogin: () => {},
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isSeller, setIsSeller] = useState<boolean>(false);
  const [showUserLogin, setShowUserLogin] = useState<boolean>(false);

  const value = {
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
