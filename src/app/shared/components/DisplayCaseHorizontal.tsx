import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { requireApiTMBD } from "../services";
import './css/DisplayCaseHorizontal.css'
import { Link } from "react-router-dom";

interface IDisplayCaseHorizontalProps {
    media: 'tv' | 'movie',
    resource: 'popular' | 'upcoming' | 'top_rated' | number,
    imgSize: "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original",
    displayTitle: string;
    last?: boolean 
}

interface IContentItems{
  load?: boolean;
  title?: string;
  poster?: string;
  vote?: number;
  id?: number;
}

export const DisplayCaseHorizontal: React.FC<IDisplayCaseHorizontalProps> = ({media, resource, imgSize, displayTitle, last}) => {
  const styleDisplay = {
      marginBottom: last? '' : 'max(30px, 15vw)'
  };

  const [content, setContent] = useState<IContentItems[]>([{ load: true }]);

  useEffect(() => {
    const executeRequire = async () => {
      const mediaData = await requireApiTMBD(media, resource, imgSize);
      Array.isArray(mediaData)? 
        setContent(mediaData.map((m: any) => (
            {
              title: m.title,
              poster: m.poster,
              vote: m.vote,
              id: m.id
            }
        )))
      :
        console.log('ops')
    };

    executeRequire();
  }, [imgSize, media, resource]);



  return(
    <>
      <div className="DisplayCaseHorizontal" style={styleDisplay}>
        <h1>{displayTitle}</h1>

        <aside className={content[0].load? 'loading' : ''}>
          { 
            content.map(({title, id, poster, vote, load}) => {
              const content = (
                <Link key={`${id} ${title}`} className="link" 
                to={`/descricao?id=${media}-${id}`}>
                  <div key={id}>
                    <img src={poster} alt={title}/>
                    <p className="title">{title}</p>
                    <p><FontAwesomeIcon color="#ff0" icon='star'/>{vote}</p>
                  </div>
                </Link>
              )
              const contentLoad = (
                <FontAwesomeIcon className="load" color="#fff" icon='spinner'/>
              )
              return (
                load? contentLoad : content
              );
            })
          }
        </aside>

      </div>
    </>
  );
}