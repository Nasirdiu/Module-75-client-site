import React, { useState } from "react";
import Footer from "../Share/Footer/Footer";
import AppointmentBanner from "./AppointmentBanner";
import AvilableAppointment from "./AvilableAppointment";

const Appointment = () => {
  const [date, setDate] = useState(new Date());
  return (
    <div>
      <AppointmentBanner
        date={date}
        setDate={setDate}
      ></AppointmentBanner>
      <AvilableAppointment date={date}></AvilableAppointment>
      <Footer></Footer>
    </div>
  );
};

export default Appointment;
