interface IObjConfig{
  [key: string]: boolean;
}

interface IRequireApiTMBDProps{
  (
    media: 'tv' | 'movie' | 'search' | 'person' | 'genre', 
    resource: 'popular' | 'top_rated' | 'tv' | 'movie' | number,
    imgSize: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original',
    objConfig?: IObjConfig,
    endPointExtra?: 'videos' | 'recommendations' | 'similar',
    page?: number | string,
    query?: string
  ): Promise<object> | React.ReactNode
}

export const requireApiTMBD: IRequireApiTMBDProps = async (media, resource, imgSize, objConfig, endPointExtra, page, query) => {
  try{

    let append_to_response = 'append_to_response='
    const Query = query? `query=${query}&` : ''
    const endPoint = endPointExtra? `/${endPointExtra}` : ''

    if(objConfig){
      const objConfigKeys = Object.keys(objConfig)
      objConfigKeys.forEach((key) => {
        append_to_response += objConfig[key]? `${key},` : ''
      });
    };

    const URL = `https://api.themoviedb.org/3/${media}/${resource}${endPoint}?api_key=fd32e96e40912048aa38d4cb763d2693&${Query}${append_to_response}&page=${page?? 1}&language=pt-BR&include_adult=false`;

    const response = await fetch(URL);
    const data = await response.json();
    const medias = data.results? data.results : [data]
    const pageTotal = data.total_pages
    
    const objMedias = await Promise.all(medias.map(async (m: any) => {

      // get basic
      const title = m.title ? m.title : m.name;
      const vote = m.vote_average.toFixed(1);
      const id = m.id;

      // get poster
      const posterURL = m.poster_path;
      const poster = m.poster_path? await getImage(posterURL, imgSize) : 'ola'

      // get time
      const calcTime = () => {
        const timeInMin = m.runtime;
        if(timeInMin){
          const hours = (timeInMin / 60).toFixed(0);
          const minutes = (timeInMin % 60).toFixed(0);
          return `${hours}h ${minutes}min`;
        };
      };
      const time = calcTime();

      // get date
      const date = m.release_date? m.release_date : 
                  m.first_air_date? m.first_air_date : null;

      // get genres
      const genres = m.genres? m.genres.map((g:any) => g.name) : null;

      // get tagline
      const tagline = m.tagline? m.tagline : null;

      // get overview
      const overview = m.overview? m.overview : null;

      // get media
      const Media = media === ('tv' || 'movie')? media : resource
      return {
        date: date,
        time: time,
        overview: overview,
        genres: genres,
        title: title,
        tagline: tagline,
        vote: vote,
        poster: poster,
        id: id,
        media: Media,
      };
    }));
    return { result: objMedias, page_total: pageTotal, error: false };
  }catch(err: any){
    console.log(`durante a requisição para o TMDB ocorreu esse erro:\n${err}`)
    return { error: true, typeError: err, errorCode: err.code };
  };
};

const getImage = async (imgUrl: string, imgSize: string) => {
  const imageURL = `https://image.tmdb.org/t/p/${imgSize}/${imgUrl}`;

  const response = await fetch(imageURL);
  const blob = await response.blob();
  const objectURL = URL.createObjectURL(blob);

  return objectURL;
};

