import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { requireApiTMBD } from "../../services";
import { Media } from '../index'
import './css/DisplayCaseHorizontal.css'
import { Link } from "react-router-dom";


interface IDisplayCaseHorizontalProps {
    media: 'tv' | 'movie',
    resource: 'popular' | 'top_rated' | number,
    imgSize: "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original",
    endPointExtra?: 'videos' | 'recommendations' | 'similar',
    displayTitle: string;
    last?: boolean;
}

export const DisplayCaseHorizontal = React.forwardRef
<HTMLDivElement, IDisplayCaseHorizontalProps>(({media, resource, imgSize, displayTitle, last, endPointExtra}, ref?) => {
  const styleDisplay = {
      marginBottom: last? '' : 'max(30px, 15vw)'
  };

  const [content, setContent] = useState<any>([{ load: true }]);

  useEffect(() => {
    const executeRequire = async () => {
      const mediaData = 
      await requireApiTMBD(media, resource, imgSize, undefined, endPointExtra);
      const medias: any = mediaData;

      if (typeof medias === 'object' && !medias.error){
        setContent(medias.result);
      }else console.log(`ocorreu um erro ao carregar o display ${displayTitle}`);
    };

    executeRequire();
  }, [displayTitle, endPointExtra, imgSize, media, resource]);

  return(
      <div className={`DisplayCaseHorizontal  ${content[0]?? 'displayNone'}`} style={styleDisplay}>
        <h1>
          {displayTitle}
          <Link className="link" to={`/lista/${media}/${resource}${endPointExtra? `-${endPointExtra}` : '' }/1`}>Mais</Link>
        </h1>

        <aside ref={ref} 
        className={content[0]? content[0].load? 'loading' : '' : 'displayNone'}>
          { 
            content.map(({title, id, poster, vote, load}: any) => {
              const content = (
                <Media
                  poster={poster}
                  title={title}
                  media={media}
                  vote={vote}
                  id={id}
                  key={id}
                />
              );

              const contentLoad = (
                <FontAwesomeIcon className="load" color="#fff" icon='spinner'/>
              );
              return (
                load? contentLoad : content
              );
            })
          }
        </aside>

      </div>
  );
})