import React, { useEffect, useCallback, useState } from "react";

import { requireApiTMBD } from "../../shared/services";

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

  const [content, setContent] = useState<object | React.ReactNode>({})
  useEffect(() => {
    const executeRequire = async () => {
      const { id, media } = getParams()

      const requireAPI = async () => {
        if(id && media){
          const objConfig: {
            similar: boolean;
            credits: boolean;
            videos: boolean;
            recommendations: boolean;
          } = {
            similar: true,
            credits: false,
            videos: true,
            recommendations: false
          };

          const mediaData = await requireApiTMBD(media, id, 'w185', 
          objConfig);
          setContent(mediaData)
        }
      }
    };
    executeRequire();
  }, [getParams]);



  return(
    <h1>oi tudo bem?</h1>
  );
}