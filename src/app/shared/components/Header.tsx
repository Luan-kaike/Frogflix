import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrog, faCircleUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import './css/Header.css';

export const Header: React.FC = () => {
  return (
    <header className="Header">
      <div>
        <Link className='link' to='/pagina-inicial'>
          <FontAwesomeIcon className="icon" icon={faFrog} color='#000' />
          <p>Frogflix</p>
        </Link>
      </div>

      <nav>
        <ul>
          <li><Link className='link' to='/pagina-inicial'>Início</Link></li>
          <li><Link className='link' to='/filmes'>Filmes</Link></li>
          <li><Link className='link' to='/series'>Séries</Link></li>
        </ul>
      </nav>

      <nav className="search">
        <input/>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </nav>
      

      <div>
        <Link className='link' to='/entrar'>
          <FontAwesomeIcon icon={faCircleUser} color='#000'/>
          <p>Entra</p>
        </Link>
      </div>
    </header>
  )
}