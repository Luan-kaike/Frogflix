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
  title: string;
  poster: string;
  vote: number;
  id: number
}

export const DisplayCaseHorizontal: React.FC<IDisplayCaseHorizontalProps> = ({media, resource, imgSize, displayTitle, last}) => 
  {
    const styleDisplay = {
      marginBottom: last? '' : 'max(30px, 15vw)'
    };

    const [content, setContent] = useState<IContentItems[]>([
      {
        title: '',
        poster: '',
        vote: 1,
        id: 1
      }
    ]);

    useEffect(() => {
      const executeRequire = async () =>{
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

          <aside>
            { 
              content.map((m) => { 
                return (
                  <Link key={`${m.id} m.title`} className="link" 
                  to={`/entrar?id=${m.id}`}>
                    <div key={m.id}>
                      <img src={m.poster} alt={m.title}/>
                      <p className="title">{m.title}</p>
                      <p><FontAwesomeIcon color="#ff0" icon='star'/>{m.vote}</p>
                    </div>
                  </Link>
                )
              })
            }
          </aside>

        </div>
      </>
    );
}