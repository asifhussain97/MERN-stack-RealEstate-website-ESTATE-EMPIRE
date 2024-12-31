import React from "react";
import Navbar from "../Partials/Navbar";
import banner_image from "../../../assets/home-background.jpg";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
// import Footer from "./Footer";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/redux/app/store";

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  console.log(user,'dashboard');



  return (
    <div>
      <Navbar />
    
      <section
        className="bg-cover h-lvh"
        style={{ backgroundImage: `url(${banner_image})` }}
      ></section>
      <div className="px-24">
      <Section1 />
      <Section2 />
      <Section3 />
    
      
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Dashboard;