import React from "react";
import Footer from "../../Share/Footer/Footer";
import Banner from "../Banner/Banner";
import Info from "../Info/Info";
import MakeApoientment from "../MakeApoientment/MakeApoientment";
import BannerService from "../Services/BannerService";
import Services from "../Services/Services";
import Testmonial from "../Testmonial/Testmonial";
import Contact from "./Contact/Contact ";

const Home = () => {
  return (
    <div className="px-12">
      <Banner></Banner>
      <Info></Info>
      <Services></Services>
      <BannerService></BannerService>
      <MakeApoientment></MakeApoientment>
      <Testmonial></Testmonial>
      <Contact></Contact>
      <Footer></Footer>
    </div>
  );
};

export default Home;
