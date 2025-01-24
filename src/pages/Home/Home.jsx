import Plans from "../../components/Plans";
import Publisher from "../../components/Publisher";
import TrendingArticles from "../../components/TrendingArticles";
import UserCounter from "../../components/UserCounter";

const Home = () => {
  return (
    <div>
      <TrendingArticles></TrendingArticles>
      <UserCounter></UserCounter>
      <Publisher></Publisher>
      <Plans></Plans>
    </div>
  );
};

export default Home;
