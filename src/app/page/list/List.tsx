import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { requireApiTMBD } from "../../shared/services";
import { Media, Wrapper } from "../../shared/components";
import './css/List.css'
import { useNavigate } from "react-router-dom";

export const List = () => {
  const { media, recurse, pag } = useParams()
  const nav = useNavigate();

  const page = useMemo(() => {
    const regex = /[^0-9]/g
    const pageString = pag?.replace(regex, '')
    const Page = pageString? parseInt(pageString)?? 1:1
    return Page
  }, [pag]);
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

  const operations = useMemo(() => {
    const totalPMore5 = totalPage > 5 
    const endPages = page+4 >= totalPage

    const updBtn = totalPMore5? !(endPages) : false
    const ellipsis = totalPMore5 && endPages
    const arrowR = page === totalPage
    const arrowL = page === 1
    return { 
      updBtn: updBtn, 
      ellipsis: ellipsis,  
      arrow: {
        L: arrowL,
        R: arrowR,
      },
      totalPMore5: totalPMore5
    }
  }, [page, totalPage])

  useEffect(() => {
    const executeRequire = async () => {
      if(recurse && media){
        let mediaData
        if(media === 'search'){
          const mediaDataMovie: any = 
            await requireApiTMBD(
              'search', 
              'movie', 
              'w185', undefined, undefined,
              page,
              recurse
            );
          const mediaDataTv: any = 
            await requireApiTMBD(
              'search', 
              'tv', 
              'w185', undefined, undefined,
              page,
              recurse
            );
          if(!mediaDataMovie.error && !mediaDataTv.error){
            const data = Array.isArray(mediaDataMovie?.result)? mediaDataMovie.result.concat(mediaDataTv.result) : null;
            const pagesTotal = Math.floor((mediaDataMovie.page_total + mediaDataTv.page_total) / 20);
            mediaData = {
              result: data, 
              page_total: pagesTotal, 
              error: data? false : true
            }
          }
        }else{
          const endPoint = recurse.includes('-')?recurse.split('-')[1] :  undefined;
          mediaData = 
            await requireApiTMBD(
              media as 'tv' | 'movie', 
              recurse as "popular" | "top_rated", 
              'w185', undefined, 
              endPoint as "recommendations" | "similar" | undefined,
              page
            );
        }
        const medias: any = mediaData;

        if (typeof medias === 'object' && medias !== null && !medias.error){
          setTotalPage(medias.page_total > 500? 500 : medias.page_total);
          setContent(medias.result);
        }else 
          if(media === ('movies' || 'tv')) nav(`/lista/${media}/popular/1`);
          else nav(`/lista/movie/popular/1`);
      };
    };
    const updateBtnsNavigated = async () => {
      if(operations.updBtn){
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
      }else
        if(totalPage > 5){
          const btnsArray = ['<', 1]
          for(let i=0; i <= 4; i++){
            btnsArray.push(totalPage - (4-i))
          }
          btnsArray.push('>')
          setBtnsNavigated(btnsArray)
        }
        else{
          const btnsArray: any[] = ['<'];
          for(let i=1; i <= totalPage; i++){
            btnsArray.push(i);
          }
          btnsArray.push('>');
          setBtnsNavigated(btnsArray);
        }
    };
    const initEffect = async () => {
      await executeRequire();
      await updateBtnsNavigated();
      window.scrollTo(0, 0);
    };
    
    initEffect();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [media, page, recurse, totalPage]);

  const loadContent = useCallback(() => {
    if(content){
      const style = { 
        marginBlock: '1.5vw',
        height: '390px',
      }
      interface IContentMap{
        title: string;
        poster: string;
        vote: number;
        id: number;
        media: string;
      }
      return(
        <>
          <aside>
            {
              content.map(
                ({title, poster, vote, id, media}: IContentMap, i: number) => {
                  console.log(media)
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
                    { 
                      (operations.totalPMore5 &&
                      ((b === totalPage && !(operations.ellipsis)) ||
                       (b === totalPage-4 && operations.ellipsis)))? 
                        <div key={`...-${i}`}>• • •</div> : null
                    }

                    <li onClick={handleClickBnt} key={`${b}-${i}`} 
                    className={`${b === page? 'current' : ''} 
                    ${((b === '<' && operations.arrow.L) || 
                       (b === '>' && operations.arrow.R) ||
                       (b === '>' && i === 1))? 'displayNone' : ''}`}
                    >
                      {b}
                    </li>
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [btnsNavigated, content, media, page]);

  return(
    <Wrapper pag="List">
      { loadContent() }
    </Wrapper>
  );
};