import { useEffect, useState } from "react";
import Details from "../Details.jsx/Details";
import Pagination from "../Pagination/Pagination";
import ServicesCard from "./ServicesCard";

const Services = () => {
    const [services,setServices]=useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);
    
    useEffect(()=>{
        fetch("https://api.spacexdata.com/v3/launches")
        .then(res=>res.json())
        .then(data=>setServices(data))
    },[])

   const lastPostIndex = currentPage *  postsPerPage;
   const firstPostIndex = lastPostIndex - postsPerPage;
   const currentPosts = services.slice(firstPostIndex, lastPostIndex);

  return (
    <div>
      <Details></Details>

      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 ">
        {currentPosts.map((currentPost) => (
          <ServicesCard
            key={currentPost.flight_number}
            service={currentPost}
          ></ServicesCard>
        ))}
      </div>
      <Pagination
        totalPosts={services.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      ></Pagination>

      {/* <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 ">
        {services.map((service) => (
          <ServicesCard
            key={service.flight_number}
            service={service}
          ></ServicesCard>
        ))}
      </div> */}
    </div>
  );
};

export default Services;
