import Faq from "../../components/Faq";
import Modals from "../../components/Modals";
import Plans from "../../components/Plans";
import Publisher from "../../components/Publisher";
import Testimonial from "../../components/Testimonial";
import TrendingArticles from "../../components/TrendingArticles";
import UserCounter from "../../components/UserCounter";

const Home = () => {
  return (
    <div>
      <Modals></Modals>
      <TrendingArticles></TrendingArticles>
      <UserCounter></UserCounter>
      <Faq></Faq>
      <Publisher></Publisher>
      <Plans></Plans>
      <Testimonial></Testimonial>
    </div>
  );
};

export default Home;
