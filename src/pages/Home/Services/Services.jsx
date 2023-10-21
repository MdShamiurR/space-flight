

import { useEffect, useState } from "react";
import Details from "../Details.jsx/Details";
import Pagination from "../Pagination/Pagination";
import ServicesCard from "./ServicesCard";

const Services = () => {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);
  const [search, setSearch] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    fetch("https://api.spacexdata.com/v3/launches")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setFilteredServices(data);
      });
  }, []);

  useEffect(() => {
    if (search !== "") {
      const filteredData = services.filter((service) =>
        service.mission_name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredServices(filteredData);
    } else {
      setFilteredServices(services);
    }
  }, [search, services]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredServices.slice(firstPostIndex, lastPostIndex);

  return (
    <div>
      <Details
        setSearch={setSearch}
        search={search}
        services={services}
        filteredServices={filteredServices}
        setFilteredServices={setFilteredServices}
        setServices={setServices}
        setCurrentPage={setCurrentPage}
      ></Details>

      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 ">
        {currentPosts.map((currentPost) => (
          <ServicesCard
            key={currentPost.flight_number}
            service={currentPost}
            filteredServices={filteredServices}
            setFilteredServices={setFilteredServices}
          ></ServicesCard>
        ))}
      </div>
      <Pagination
        totalPosts={filteredServices.length} // Use filteredServices length
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      ></Pagination>
    </div>
  );
};

export default Services;
