import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { requireApiTMBD } from "../../shared/services";
import { Media, Wrapper } from "../../shared/components";
import './css/List.css'
import { useNavigate } from "react-router-dom";

export const List = () => {
  const { media, recurse, pag } = useParams()
  const page = useMemo(() => {
    const regex = /[^0-9]/g
    const pageString = pag?.replace(regex, '')
    const Page = pageString? parseInt(pageString)?? 1:1
    return Page
  }, [pag])
  const nav = useNavigate()

  const [totalPage, setTotalPage] = useState<number>(0)
  const [content, setContent] = useState<any>(null)
  const [btnsNavigated, setBtnsNavigated] = useState<any[]>([]);

  const handleClickBnt = (e: any) => {
    const URLbase = `/lista/${media}/${recurse}/`
    let inner = e.target.innerHTML

    let value = 0;

    if(inner === '&lt;') value = page - 1
    else if(inner === '&gt;') value = page + 1
    else value = inner
    if(value <= 0) value = 1

    nav(`${URLbase}${value}`)
  }

  useEffect(() => {
    const executeRequire = async () => {
      if(recurse && media){
        const mediaData = 
          await requireApiTMBD(
            media as 'tv' | 'movie', 
            recurse as "popular" | "upcoming" | "top_rated", 
            'w185', undefined, undefined,
            page
          );
        
        if (typeof mediaData === 'object' && mediaData !== null){
          const medias: any = mediaData;
          setTotalPage(medias.page_total > 500? 500 : medias.page_total);
          setContent(medias.result);
        }else setContent(null);
      }
    };
    const updateBtnsNavigated = async () => {
      
      if(!(page+4 >= totalPage)){
        const btnsArray = []
        for(let i=-1; i < 6; i++){
          let inner

          if(i < 4)
            if(i === -1) inner = '<'
            else inner = page+i
          else 
            if(i === 4) inner = totalPage
            else inner = '>'

          btnsArray.push(inner)
        }
        setBtnsNavigated(btnsArray)
      }else{
        const btnsArray = ['<' ,496 ,497 , 498, 499, 500, '>']
        setBtnsNavigated(btnsArray)
      }
      
    };
    const initEffect = async () => {
      await executeRequire();
      await updateBtnsNavigated();
      window.scrollTo(0, 0);
    };
    
    initEffect();
    
  }, [media, page, recurse, totalPage]);

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
        <>
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
          </aside>

          <ul>
            {
              btnsNavigated.map((b, i) => {
                return(
                  <>
                    <li onClick={handleClickBnt} key={`${b}-${i}`} className=
                    {`${b == page? 'current' : ''} 
                    ${((i === 0 && page === 1) || (i === 6 && page >= totalPage))? 'displayNone' : ''}`}>
                      {b}
                    </li>
                    { i === 4? <div className={page+4 >= totalPage? 'displayNone' : ''} key={`...-${i}`}>• • •</div> : null }
                  </>
                )
              })
            }
          </ul>
        </>
      );
    };

    return(
      <aside className="loading">
        <FontAwesomeIcon className='load' color="#fff" icon='spinner'/>
      </aside>
    );
  }, [btnsNavigated, content, media, page]);

  return(
    <Wrapper pag="List" heightAuto>
      { loadContent() }
    </Wrapper>
  )
}