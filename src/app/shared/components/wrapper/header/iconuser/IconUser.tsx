import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import { useUsuarioLogado } from "../../../../hooks";
import { IStateIcon } from "../../../../context";
import './IconUser.css';

export const IconUser: React.FC = () => {
  const { name, icon, logged, logout, remove } = useUsuarioLogado();
  const { userColor, userIcon } = icon as IStateIcon;

  const styleUserBg = useMemo(() => {
    return {
      background: `linear-gradient(70deg, ${userColor[0]} 44%, ${userColor[1]}`
    };
  }, [userColor]);

  return(
    <div className={ `IconUser ${logged? 'logged' : ''}`}>
      <Link className='link' to='/entrar'>
        <FontAwesomeIcon className='user' 
        color='#fff' 
        style={styleUserBg} 
        icon={userIcon as IconProp}/>
        <p>{logged? name : 'Entrar'}</p>
      </Link>

      <ul>
        <li className="href" onClick={logout}>Sair</li>
        <li className="href" onClick={() => remove(name)}>
          Deletar
        </li>
      </ul>
    </div>
  );
};