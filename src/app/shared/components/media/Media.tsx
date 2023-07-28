import React, { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import './css/Media.css'


interface IMediaProps{
  poster: string | undefined;
  title: string | undefined;
  media: 'movie' | 'tv' | undefined;
  vote: number | undefined;
  id: number | undefined;
  style?: object
}

const media: React.FC<IMediaProps> = 
({title, poster, media, id, vote, style}) => {
  return(
    <Link key={`${id} ${title}`} className="Media Link" 
    to={`/descricao/${media}/${id}`} style={style}>
      <div key={id}>
        <img src={poster} alt={title}/>
        <p className="title">{title}</p>
        <p><FontAwesomeIcon color="#ff0" icon='star'/>{vote}</p>
      </div>
    </Link>
  );
}

export const Media = memo( media )
