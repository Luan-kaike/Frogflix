import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { requireApiTMBD } from "../../services";
import { Media } from '../index'
import './css/DisplayCaseHorizontal.css'


interface IDisplayCaseHorizontalProps {
    media: 'tv' | 'movie',
    resource: 'popular' | 'upcoming' | 'top_rated' | number,
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

  interface IContentItems{
    load?: boolean;
    title?: string;
    poster?: string;
    vote?: number;
    id?: number;
  }
  const [content, setContent] = useState<IContentItems[]>([{ load: true }]);

  useEffect(() => {
    const executeRequire = async () => {
      const mediaData = 
      await requireApiTMBD(media, resource, imgSize, undefined, endPointExtra);
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
  }, [endPointExtra, imgSize, media, resource]);



  return(
      <div className={`DisplayCaseHorizontal  ${content[0]?? 'displayNone'}`} style={styleDisplay}>
        <h1>{displayTitle}</h1>

        <aside ref={ref} 
        className={content[0]? content[0].load? 'loading' : '' : 'displayNone'}>
          { 
            content.map(({title, id, poster, vote, load}) => {
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