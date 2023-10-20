import { useEffect, useState } from "react";
import ServicesCard from "./ServicesCard";

const Services = () => {
    const [services,setServices]=useState([]);
    useEffect(()=>{
        fetch("https://api.spacexdata.com/v3/launches")
        .then(res=>res.json())
        .then(data=>setServices(data))
    },[])

  return (
    <div
      className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 "
    >
      {services.map((service) => (
        <ServicesCard
          key={service.flight_number}
          service={service}
        ></ServicesCard>
      ))}
    </div>
  );
};

export default Services;
