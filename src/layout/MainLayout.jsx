import Navber from "../components/Navber";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
// import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Navber></Navber>
      <div className="min-h-[500px]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
