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

export interface IStateIcon{
  userIcon: string;
  userColor: string[];
}

//background: linear-gradient( 55deg, #8743dd 40%, #3ef326);
export const UsuarioLogadoContext = createContext<IUsuarioLogadoData>({} as IUsuarioLogadoData);

export const UsuarioLogadoProvider: React.FC<IUsuarioLogadoProps> = ({children}) => {

  const [name, setName] = useState('Entrar')
  const [icon, setIcon] = useState<IStateIcon>({userIcon: 'circle-user', userColor: ['#000', '#000']})

  const logout = useCallback((name:string) => {
    setName(name)

    const newIcon = name[0]
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
