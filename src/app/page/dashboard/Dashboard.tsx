import { Header } from "../../shared/components"
import { DisplayCaseHorizontal } from "../../shared/components";

export const Dashboard = () => {
  return(
    <div>
      <Header />
      <DisplayCaseHorizontal media="tv" resource='top_rated' imgSize="w185"/>
    </div>
  );
}