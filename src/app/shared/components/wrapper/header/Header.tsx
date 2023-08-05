import React, { useCallback, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Header.css';
import { IconUser } from "./iconuser/IconUser";
import { Anchors } from "./anchors/Anchors";

export const Header: React.FC = () => {

  const nav = useNavigate();
  
  const [iconSearch, setIconSearch] = useState(true);

  const divSearch = useRef<HTMLDivElement>(null);
  const inputSearch = useRef<HTMLInputElement>(null);

  const closeBarSearch = useCallback((e: any) => {
    if(e.key === 'Escape'){
      if(divSearch.current){
        setIconSearch(true);
        divSearch.current.style.transform = '';
      }
    }
  }, []);

  const handleClickSearch = useCallback(() => {
    setIconSearch(!iconSearch);
    if(divSearch.current){
      if(iconSearch){
        inputSearch.current?.focus();
        divSearch.current.style.transform = 'translateY(max(50px,7vw))'; 
        window.addEventListener('keydown', closeBarSearch);
      }else{
        if(inputSearch.current) inputSearch.current.value = '';
        divSearch.current.style.transform = '';
        window.removeEventListener('keydown', closeBarSearch);
      };
    };
  }, [iconSearch, closeBarSearch]);

  const handleSearch = useCallback(() => {
    const searchValue = inputSearch.current?.value.replaceAll(' ', '+');
    nav(`/lista/search/${searchValue}/1`);
    if(inputSearch.current && divSearch.current) {
      setIconSearch(true);
      inputSearch.current.value = '';
      divSearch.current.style.transform = '';
      window.removeEventListener('keydown', closeBarSearch);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputSearch]);
  return (
    <>
      <div className="HeaderPlaceHolder"></div>

      <div ref={divSearch} className="HeaderDivSearch">
        <FontAwesomeIcon icon="magnifying-glass" color='#000' 
          flip="horizontal"
          onClick={handleSearch}
        />
        <input ref={inputSearch} type="text"
          placeholder="Pesquise filmes ou series"
          onKeyDown={(e) => e.key === 'Enter'? handleSearch() : null}
        />
      </div>

      <header className="Header">
        <div className='contentLeft'>
          <div>
            <Link className='link' to='/pagina-inicial'>
              <FontAwesomeIcon className="icon" icon="frog" color='#fff' />
              <p>Frogflix</p>
            </Link>
          </div>

          <Anchors />
        </div>
        
        <div>
          <nav className="search">
            <FontAwesomeIcon icon={iconSearch? 'magnifying-glass' : 'x'}
            color='#fff' viewBox="0 15 512 512"
            onClick={handleClickSearch} 
            />
          </nav>

          <IconUser />
        </div>
      </header>
    </>
  );
};

// uyhuuyt