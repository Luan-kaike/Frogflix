import React, { createContext, useCallback, useState } from "react";
import { getPaletteUser } from "../helpers/getPaletteUser";

interface IUsuarioLogadoData{
  name: string;
  icon: object;

  logout: (name:string) => void;
};

interface IUsuarioLogadoProps{
  children: React.ReactNode;
}
// requireApiTMBD
export interface IStateIcon{
  userIcon: string;
  userColor: string[];
}

export const UsuarioLogadoContext = createContext<IUsuarioLogadoData>({} as IUsuarioLogadoData);

export const UsuarioLogadoProvider: React.FC<IUsuarioLogadoProps> = ({children}) => {

  const [name, setName] = useState('Entrar')
  const [icon, setIcon] = useState<IStateIcon>({userIcon: 'circle-user', userColor: ['#000', '#000']})

  const logout = useCallback((name:string) => {
    setName(name)

    const newIcon = name[0].toLowerCase()
    const newColor = getPaletteUser()
    setIcon({userIcon: newIcon, userColor: newColor,})
  }, [])

  return (
    <UsuarioLogadoContext.Provider value={
      {
        name: name,
        icon: icon,
        logout: logout
      }}>
      {children}
    </UsuarioLogadoContext.Provider>
  )
}
