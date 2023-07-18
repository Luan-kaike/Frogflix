import { useEffect, useCallback, useState } from "react";

import './css/Description.css'
import { requireApiTMBD } from "../../shared/services";
import { Wrapper } from "../../shared/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IGetParams{
  error: boolean;
  media: 'tv' | 'movie' | null;
  id: number;
}
export const Description = () => {

  const getParams = useCallback(() => {
    try{
    const currentURL = window.location.href
    const query = currentURL.split('?')[1]
    const param = query.split('=')[1]

    const media = param.split('-')[0]
    const id = parseInt(param.split('-')[1])

    const response: IGetParams = {
      error: false,
      media: media === 'tv' || media === 'movie'? media : null,
      id: id,
    }

    return response
    }catch{
      return {
        error: false,
        media: null,
        id: null
      }
    }
  }, [])

  const [content, setContent] = useState<any>(null)

  useEffect(() => {
    const executeRequire = async () => {
      const { id, media } = getParams()

      if(id && media){
        const objConfig = {
          similar: true,
          credits: true,
          videos: true,
          recommendations: true,
        };

        const mediaData = await requireApiTMBD(media, id, 'w185', 
        objConfig);
        Array.isArray(mediaData)? setContent(mediaData[0]) : setContent(null);
      }
    };
    executeRequire();
  }, [getParams]);

  const loadContent = useCallback(() => {
    if(content){
      return(
        <div>

          <img src={content.poster} alt={content.title} />

          <aside>
            <div className="infoMain">
              <h1>{content.title}</h1>
              <h3>
                {content.date? `${content.time} • ` : ''}
                {content.date? `${content.genres.join(', ')} • ` : ''}
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
      );
    };

    return(
      <aside className="loading">
        <FontAwesomeIcon className='load' color="#fff" icon='spinner'/>
      </aside>
    );
  }, [content])

  return(
    <Wrapper pag="Description">
        {loadContent()}
    </Wrapper>
  );
}