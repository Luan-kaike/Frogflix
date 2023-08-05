import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import './Anchors.css';

export const Anchors: React.FC = () => {
  const statusURL = useMemo(() => {
    let status;
    const p = window.location.pathname;

    if(p.includes('/pagina-inicial')) status = 'main';
    else if(p.includes('/entrar')) status = 'login';
    else if(p.includes('/lista/movie/popular')) status = 'movie';
    else if(p.includes('/lista/tv/popular')) status = 'tv';
    return status;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  const objAnchors = [
    {
      to: '/pagina-inicial',
      title: 'Início',
      className: `link href ${statusURL === 'main'? 'active' : ''}`,
    },
    {
      to: '/lista/movie/popular/1',
      className: `link href ${statusURL === 'movie'? 'active' : ''}`,
      title: 'Filmes',
    },
    {
      to: '/lista/tv/popular/1',
      className: `link href ${statusURL === 'tv'? 'active' : ''}`,
      title: 'Séries',
    },
  ];

  return(
    <ul className="Anchors">
      <li>
        <FontAwesomeIcon icon="bars" color='#fff' />
          <ul>
            {
              objAnchors.map(({title, to, className}) => {
                return(
                  <li key={to}>
                    <Link className={className} to={to}>
                      {title}
                    </Link>
                  </li>
                );
              })
            }
          </ul>
      </li>
    </ul>
  );
};