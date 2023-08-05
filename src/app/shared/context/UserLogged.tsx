import React, { createContext, useState } from "react";
import removeAccents from 'remove-accents';

import { getPaletteUser, DataBase } from "../helpers";

interface IUsuarioLogadoData{
  name: string;
  icon: object;
  logged: boolean;

  logout: () => void;
  remove: (name:string) => void;
  signUp: (name: string, password: string) => void;
  login: (name: string, password: string) => void;
};
interface IUsuarioLogadoProps{
  children: React.ReactNode;
};
// requireApiTMBD
export interface IStateIcon{
  userIcon: string;
  userColor: string[];
};

export const UsuarioLogadoContext = createContext<IUsuarioLogadoData>({} as IUsuarioLogadoData);

export const UsuarioLogadoProvider: React.FC<IUsuarioLogadoProps> = ({children}) => {

  const db = new DataBase();
  const [logged, setLogged] = useState(false)
  const [name, setName] = useState('');
  const [icon, setIcon] = 
  useState<IStateIcon>({userIcon: 'circle-user', userColor: ['#000', '#000']});

  const signUp = (name: string, password: string) => {
    const result = db.singUp(
      {
        name: name,
        password: password,
        colors: getPaletteUser(),
      }
    );

    if(result.error)
      return result.error;
    
    login(name, password);
  };

  const login = (name: string, password: string): 
  {error: boolean, msg?: string }  => {
    const result = db.login(name, password);
    if(result.error)
      return { error: true, msg: result.msg };

    const firstLetter = name[0].toLowerCase();
    const newIcon = removeAccents(firstLetter);
    const newColor = result.colors;
    setName(name);
    setIcon({ userIcon: newIcon, userColor: newColor });
    setLogged(true)
    return { error: false }
  };

  const logout = () => {
    setLogged(false)
    const defaultIconTempled = {userIcon: 'circle-user', userColor: ['#000', '#000']}
    setIcon(defaultIconTempled)
    setName('Entrar')
  };

  const remove = (name: string) => {
    db.remove(name)
    logout()
  };

  return (
    <UsuarioLogadoContext.Provider value={
      {
        logged: logged,
        name: name,
        icon: icon,
        logout: logout,
        signUp: signUp,
        login: login,
        remove: remove,
      }
    }>
      {children}
    </UsuarioLogadoContext.Provider>
  );
};
