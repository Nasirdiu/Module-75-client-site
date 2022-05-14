import React from "react";
import InfoCard from "./InfoCard";
import clock from "../../../assets/icons/clock.svg";
import phone from "../../../assets/icons/phone.svg";
import marker from "../../../assets/icons/marker.svg";
const Info = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-12">
      <InfoCard
        CardTitle="Opening Hours"
        bgClass="bg-gradient-to-r from-secondary to-primary"
        CardBody="Click the button to listen on Spotiwhy app."
        img={clock}
      ></InfoCard>
      <InfoCard
        CardTitle="Visit our location"
        bgClass="bg-[#3d4451]"
        CardBody="Brooklyn, NY 10036, United States"
        img={marker}
      ></InfoCard>
      <InfoCard
        CardTitle="Contact us now"
        bgClass="bg-gradient-to-r from-secondary to-primary"
        CardBody="+000 123 456789"
        img={phone}
      ></InfoCard>
    </div>
  );
};

export default Info;
