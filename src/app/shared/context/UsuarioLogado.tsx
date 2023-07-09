import React, { createContext, useCallback, useState } from "react";

interface IUsuarioLogadoData{
  name: string;
  logout: () => void;
};

interface IUsuarioLogadoProps{
  children: React.ReactNode;
}

export const UsuarioLogadoContext = createContext<IUsuarioLogadoData>({} as IUsuarioLogadoData);

export const UsuarioLogadoProvider: React.FC<IUsuarioLogadoProps> = ({children}) => {

  let [name, setName] = useState('')
  const logout = useCallback(() => {
    setName('newName')
  }, [])

  return (
    <UsuarioLogadoContext.Provider value={{name: name, logout: logout}}>
      {children}
    </UsuarioLogadoContext.Provider>
  )
}
