import Navber from "../components/Navber";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navber></Navber>
      <div className="min-h-[480px]"></div>
      This is Layout
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
