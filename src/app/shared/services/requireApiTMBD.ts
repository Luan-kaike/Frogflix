interface IObjConfig{
  [key: string]: boolean;
}

interface IRequireApiTMBDProps{
  (
    media: 'tv' | 'movie' | 'search' | 'person' | 'genre', 
    resource: 'popular' | 'upcoming' | 'top_rated' | 'person' |  number,
    imgSize: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original',
    objConfig?: IObjConfig
  ): Promise<object> | React.ReactNode
}

export const requireApiTMBD: IRequireApiTMBDProps = async (media, resource, imgSize, objConfig) => {
  let append_to_response = 'append_to_response='

  if(objConfig){
    const objConfigKeys = Object.keys(objConfig)
    objConfigKeys.forEach((key) => {
      append_to_response += objConfig[key]? `${key},` : ''
    });
  };

  const URL = `https://api.themoviedb.org/3/${media}/${resource}?api_key=fd32e96e40912048aa38d4cb763d2693&${append_to_response}&language=pt-BR&include_adult=false`;

  const response = await fetch(URL);
  const data = await response.json();
  const medias = data.results? data.results : [data]
  console.dir(medias)
  
  const objMedias = await Promise.all(medias.map(async (m: any) => {

    // get basic
    const title = m.title ? m.title : m.name;
    const vote = m.vote_average.toFixed(1);
    const id = m.id;

    // get poster
    const posterURL = m.poster_path;
    const poster = await getImage(posterURL, imgSize);

    // get companies
    const companies = m.production_companies;
    if(companies){
      companies.map( async (c: any) => {
        c.logo_path = c.logo_path? await getImage(c.logo_path, imgSize) : null;
      });
    };

    // get money status
    interface IMoneyItems{
      budget?: number | null;
      revenue?: number | null;
      gain?: number | null;
    };
    const money: IMoneyItems = {};
    const budget = m.budget? m.budget : null;
    const revenue = m.revenue? m.revenue : null;
    if(budget && revenue){
      const gain = revenue - budget;
      money.budget = budget;
      money.revenue = revenue;
      money.gain = gain;
    };

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

    return {
      date: date,
      time: time,
      overview: overview,
      companies: companies,
      genres: genres,
      title: title,
      tagline: tagline,
      money: money,
      vote: vote,
      poster: poster,
      id: id,
    };
  }));

  return objMedias;
};

const getImage = async (imgUrl: string, imgSize: string) => {
  const imageURL = `https://image.tmdb.org/t/p/${imgSize}/${imgUrl}`;

  const response = await fetch(imageURL);
  const blob = await response.blob();
  const objectURL = URL.createObjectURL(blob);

  return objectURL;
};