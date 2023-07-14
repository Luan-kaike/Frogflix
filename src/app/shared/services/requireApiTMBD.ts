interface IRequireApiTMBDProps{
  (
    media: 'tv' | 'movie' | 'search' | 'person' | 'genre', 
    resource: 'popular' | 'upcoming' | 'top_rated' | 'person' |  number,
    imgSize: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original'
  ): Promise<object> | React.ReactNode
}

export const requireApiTMBD: IRequireApiTMBDProps = async (media, resource, imgSize) => {
  const URL = `https://api.themoviedb.org/3/${media}/${resource}?api_key=fd32e96e40912048aa38d4cb763d2693&language=pt-BR`;

  const response = await fetch(URL);
  const data = await response.json();
  const medias = await data.results
  
  const objMedias = await Promise.all(medias.map(async (m: any) => {
    const posterURL = m.poster_path
    const poster = await getImage(posterURL, imgSize)

    const title = m.title ? m.title : m.name
    const vote = m.vote_average
    const id = m.id
    return {
      title: title,
      vote: vote,
      poster: poster,
      id: id
    }
  }))

  return objMedias
};


const getImage = async (imgUrl: string, imgSize: string) => 
{
  const imageURL = `https://image.tmdb.org/t/p/${imgSize}/${imgUrl}`

  const response = await fetch(imageURL);
  const blob = await response.blob();
  const objectURL = URL.createObjectURL(blob);

  return objectURL
};