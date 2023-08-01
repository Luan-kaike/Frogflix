import { Wrapper } from "../../shared/components"
import { DisplayCaseHorizontal } from "../../shared/components";

interface IDisplaysCase{
  title: string;
  media: 'tv' | 'movie';
  resource: "popular" | "top_rated"
}

export const Dashboard = () => {
  const displaysCase: IDisplaysCase[] = [
    {
      title: 'Filmes mais populares',
      media: 'movie',
      resource: 'popular'
    },
    {
      title: 'Filmes mais bem avaliadas',
      media: 'movie',
      resource: 'top_rated'
    },
    {
      title: 'Séries mais populares',
      media: 'tv',
      resource: 'popular'
    },
    {
      title: 'Séries mais bem avaliadas',
      media: 'tv',
      resource: 'top_rated'
    },
  ];
  
  return(
      <Wrapper pag="Dashboard">
        {
          displaysCase.map((d, i) => (
            <DisplayCaseHorizontal 
              key={`${d.title}-${i}`}
              displayTitle={d.title}
              media={d.media}
              resource={d.resource}
              imgSize="w185"
              last={i === displaysCase.length-1}
            />
          ))
        }
      </Wrapper>
  );
}