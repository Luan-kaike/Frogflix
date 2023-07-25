import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { requireApiTMBD } from "../../shared/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Media, Wrapper } from "../../shared/components";
import './css/List.css'

export const List = () => {
  const { media, recurse, pag } = useParams()

  const [content, setContent] = useState<any>(null)

  useEffect(() => {
    const executeRequire = async () => {
      if(recurse && media){
        const mediaData = 
          await requireApiTMBD(
            media as 'tv' | 'movie', 
            recurse as "popular" | "upcoming" | "top_rated", 
            'w185'
          );
        Array.isArray(mediaData)? setContent(mediaData) : setContent(null);
      }
    };
    executeRequire();
    window.scrollTo(0, 0);
  }, [media, recurse])

  const loadContent = useCallback(() => {
    if(content){
      const style = { marginBlock: '1.5vw' }
      interface IContentMap{
        title: string;
        poster: string;
        vote: number;
        id: number;
      }
      return(
        <aside>
          {
            content.map(
              ({title, poster, vote, id}: IContentMap, i: number) => {
                return(
                  <Media
                    title={title}
                    poster={poster}
                    key={`${title}-${i}`}
                    vote={vote}
                    id={id}
                    media={media as 'tv' | 'movie'}
                    style={style}
                  />
                )
              }
            )
          }
          <ul>
            <li>{'<'}</li>
            {/*
              | < | 1 | 2 | 3 | 4 | ... | 40034 | > |
            */}
            <li>{'>'}</li>
          </ul>
        </aside>
      );
    };

    return(
      <aside className="loading">
        <FontAwesomeIcon className='load' color="#fff" icon='spinner'/>
      </aside>
    );
  }, [content, media])

  return(
    <Wrapper pag="List" heightAuto>
      { loadContent() }
    </Wrapper>
  )
}