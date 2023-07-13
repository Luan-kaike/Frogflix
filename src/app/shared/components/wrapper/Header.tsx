import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { useUsuarioLogado } from "../../hooks";
import { IStateIcon } from "../../context";
import './css/Header.css';

export const Header: React.FC = () => {
  const { name, icon } = useUsuarioLogado()
  const { userColor, userIcon } = icon as IStateIcon

  return (
    <>
      <div className="HeaderPlaceHolder"></div>

      <header className="Header">
        <div>
          <Link className='link' to='/pagina-inicial'>
            <FontAwesomeIcon className="icon" icon="frog" color='#fff' />
            <p>Frogflix</p>
          </Link>
        </div>

        <nav>
          <ul>
            <li>
              <Link className='link href' to='/pagina-inicial'>Início</Link>
              </li>
            <li>
              <Link className='link href' to='/filmes'>Filmes</Link>
            </li>
            <li>
              <Link className='link href' to='/series'>Séries</Link>
            </li>
          </ul>
        </nav>

        <nav className="search">
          <input/>
          <FontAwesomeIcon color='#fff' icon='magnifying-glass' viewBox="0 15 512 512"/>
        </nav>

        <div>
          <Link className='link' to='/entrar'>
            <FontAwesomeIcon className='user' 
            
            color='#fff' style={{
              background: `linear-gradient(70deg, ${userColor[0]} 44%, ${userColor[1]})`
            }} 
            icon={userIcon as IconProp}/>
            <p>{name}</p>
          </Link>
        </div>
      </header>

    </>
  )
}