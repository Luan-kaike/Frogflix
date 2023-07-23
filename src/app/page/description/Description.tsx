import { useEffect, useCallback, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from 'react-router-dom';

import './css/Description.css'
import { requireApiTMBD } from "../../shared/services";
import { Wrapper } from "../../shared/components";
import { DisplayCaseHorizontal } from "../../shared/components";


export const Description = () => {

  const [content, setContent] = useState<any>(null)
  
  const displayReco = useRef<HTMLDivElement>(null)
  const displaySimi = useRef<HTMLDivElement>(null)

  const { id, media } = useParams()

  useEffect(() => {
    const executeRequire = async () => {
      
      if(id && media){
        const objConfig = {
          similar: true,
          credits: true,
          videos: true,
          recommendations: true,
        };

        const mediaData = 
          await requireApiTMBD(
            media as 'tv' | 'movie', 
            id? parseInt(id)?? 1 : 1, 
            'w185', 
            objConfig
          );

        Array.isArray(mediaData)? setContent(mediaData[0]) : setContent(null);
      }
    };
    executeRequire();
    displayReco.current?.scrollTo(0, 0)
    displaySimi.current?.scrollTo(0, 0)
    window.scrollTo(0, 0);
  }, [id, media]);

  const loadContent = useCallback(() => {
    if(content){
      const objDisplays = [
        {
          title: 'Recomendados',
          endPoint: 'recommendations',
          ref: displayReco,
        },
        {
          title: 'Similares',
          endPoint: 'similar',
          ref: displaySimi,
        }
      ]
      return(
        <>
          <div>
            <img src={content.poster} alt={content.title} />

            <aside>
              <div className="infoMain">
                <h1>{content.title}</h1>
                <h3>
                  {content.time? `${content.time} • ` : ''}
                  {content.genres? `${content.genres.join(', ')} • ` : ''}
                  {content.date? `${content.date.split('-')[0]}` : ''}
                </h3>
              </div>
              
              <div className="infoSecond">
                <h3>
                  <FontAwesomeIcon color='#ff0' icon='star'/> {content.vote}
                </h3>
                <h4><i>{content.tagline}</i></h4>
              </div>

              <div className="infoThird">
                <p>Sinopse:</p>
                <p className="overview">{content.overview}</p>
              </div>
            </aside>
          </div>

          {
            objDisplays.map(({title, endPoint, ref}, i) => (
              <DisplayCaseHorizontal 
                endPointExtra={endPoint as "recommendations" | "similar"}
                imgSize="w185"
                displayTitle={title}
                resource={id? parseInt(id)?? 1 : 1}
                media={media as 'tv' | 'movie'}
                ref={ref}
                key={`${title}-${i}`}
              />
            ))
          }
        </>
      );
    };

    return(
      <aside className="loading">
        <FontAwesomeIcon className='load' color="#fff" icon='spinner'/>
      </aside>
    );
  }, [content, id, media])

  return(
    <Wrapper pag="Description" heightAuto>
        {loadContent()}
    </Wrapper>
  );
}
