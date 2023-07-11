import { Header } from "../../shared/components"
import { DisplayCaseHorizontal } from "../../shared/components";

export const Dashboard = () => {
  return(
    <div>
      <Header />
      <DisplayCaseHorizontal 
        displayTitle='Séries mais populares' 
        media="tv" 
        resource='popular' 
        imgSize="w185"
      />
      <DisplayCaseHorizontal 
        displayTitle='Séries mais bem avaliadas' 
        media="movie" 
        resource='top_rated' 
        imgSize="w185"
      />
      <DisplayCaseHorizontal 
        displayTitle='Séries mais populares' 
        media="tv" 
        resource='popular' 
        imgSize="w185"
        last
      />
    </div>
  );
}