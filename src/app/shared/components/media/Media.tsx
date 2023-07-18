import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import './css/Media.css'


interface IMediaProps{
  poster: string | undefined;
  title: string | undefined;
  media: 'movie' | 'tv' | undefined;
  vote: number | undefined;
  id: number | undefined;
}

export const Media: React.FC<IMediaProps> = 
({title, poster, media, id, vote}) => {
  return(
    <Link key={`${id} ${title}`} className="Media Link" 
    to={`/descricao?id=${media}-${id}`}>

      <div key={id}>
        <img src={poster} alt={title}/>
        <p className="title">{title}</p>
        <p><FontAwesomeIcon color="#ff0" icon='star'/>{vote}</p>
      </div>

    </Link>
  );
}