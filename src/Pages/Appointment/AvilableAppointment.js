import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loading from "../Share/Loading/Loading";
import AppointmentServices from "./AppointmentServices";
import BookingModal from "./BookingModal";

const AvilableAppointment = ({ date }) => {
  // const [services, setServices] = useState([]);
  const [treatment, setTreatment] = useState(null);
  const formateDate = format(date, "PP");
  const { data: services, isLoading,refetch } = useQuery(["available",formateDate], () =>
    fetch(`http://localhost:5000/available?date=${formateDate}`).then((res) =>
      res.json()
    )
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  // useEffect(() => {
  //   fetch(`http://localhost:5000/available?date=${formateDate}`)
  //     .then((res) => res.json())
  //     .then((data) => setServices(data));
  // }, [formateDate]);
  return (
    <div className="my-10">
      <h4 className="text-secondary font-bold text-center text-xl my-12">
        Avilable Appointment on {format(date, "PP")}
      </h4>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {services?.map((service) => (
          <AppointmentServices
            key={service._id}
            service={service}
            setTreatment={setTreatment}
          ></AppointmentServices>
        ))}
      </div>
      {treatment && (
        <BookingModal
          date={date}
          treatment={treatment}
          setTreatment={setTreatment}
          refetch={refetch}
        ></BookingModal>
      )}
    </div>
  );
};

export default AvilableAppointment;
