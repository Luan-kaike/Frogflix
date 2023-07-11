import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { requireApiTMBD } from "../services";

interface IDisplayCaseHorizontalProps {
    media: 'tv' | 'media',
    resource: 'popular' | 'upcoming' | 'top_rated' | number,
    imgSize: "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original"
}

interface IContentItems{
  title: string;
  poster: string;
  vote: number;
  id: number
}

export const DisplayCaseHorizontal: React.FC<IDisplayCaseHorizontalProps> = ({media, resource, imgSize}) => 
  {
    const navigate = useNavigate()

    const handleClick = (e: any) => {
      console.log(e)
      navigate('/entrar')
    }

    const [content, setContent] = useState<IContentItems[]>([
      {
        title: '',
        poster: '',
        vote: 1,
        id: 1
      }
    ])

    useEffect(() => {
      const executeRequire = async () =>{
        const mediaData = await requireApiTMBD(media, resource, imgSize)
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
      }
      executeRequire()
    }, [imgSize, media, resource])

    return(
      <aside>
        { 
          content.map((m) => { 
            return (
              <div key={m.id} onClick={handleClick}>
                <img src={m.poster} alt={m.title}/>
                <h1>{m.title}</h1>
                <p>{m.vote}</p>
              </div>
            )
          })
        }
      </aside>
    )
  }