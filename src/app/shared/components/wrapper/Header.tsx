import React, { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { useUsuarioLogado } from "../../hooks";
import { IStateIcon } from "../../context";
import './css/Header.css';

export const Header: React.FC = () => {

  const { name, icon } = useUsuarioLogado()
  const { userColor, userIcon } = icon as IStateIcon

  const [iconSearch, setIconSearch] = useState(true)

  const divSearch = useRef<HTMLDivElement>(null)
  const inputSearch = useRef<HTMLInputElement>(null)

  const handleClickSearch = useCallback(() => {
    setIconSearch(!iconSearch)
    if(divSearch.current){
      if(iconSearch){
        inputSearch.current?.focus()
        divSearch.current.style.transform = 'translateY(max(50px,7vw))'; 
        
      }else{
        divSearch.current.style.transform = '';
      }
    }
  }, [iconSearch]);

  return (
    <>
      <div className="HeaderPlaceHolder"></div>

      <div ref={divSearch} className="HeaderDivSearch">
        <input ref={inputSearch} type="text"
          placeholder="Pesquise filmes ou series"
        />
      </div>

      <header className="Header">
        <div>
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
        </div>
        
        <div>
          <nav className="search">
            <FontAwesomeIcon icon={iconSearch? 'magnifying-glass' : 'x'}
            color='#fff' viewBox="0 15 512 512"
            onClick={handleClickSearch} 
            />
          </nav>

          <div>
            <Link className='link' to='/entrar'>
              <FontAwesomeIcon className='user' 
              color='#fff' 
              style={{
                background: `linear-gradient(70deg, ${userColor[0]} 44%, ${userColor[1]})`
              }} 
              icon={userIcon as IconProp}/>
              <p>{name}</p>
            </Link>
          </div>
        </div>
        

        
      </header>

    </>
  )
}