
import { useEffect, useState } from "react";
import Details from "../Details.jsx/Details";
import Pagination from "../Pagination/Pagination";
import ServicesCard from "./ServicesCard";

const Services = () => {
    const [services,setServices]=useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);

    const [search, setSearch] = useState("");
    const [searchData,setSearchData]=useState([])
    
    useEffect(()=>{
        fetch("https://api.spacexdata.com/v3/launches")
        .then(res=>res.json())
        .then(data=>setServices(data))
        
    },[])

      useEffect(() => {
        if (search !== "") {
          const filteredData = services.filter((service) =>
            service.mission_name.toLowerCase().includes(search.toLowerCase())
          );
          setSearchData(filteredData);
        } else {
          setSearchData([]);
        }
      }, [search, services]);

    // useEffect(()=>{
    //   if(search !==""){
    //     fetch(`https://api.spacexdata.com/v3/launches?q=${search}`)
    //       .then((res) => res.json())
    //       .then((data) => setSearchData(data));
    //   }
    // },[search])

   const lastPostIndex = currentPage *  postsPerPage;
   const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts =
    search !== "" ? searchData : services.slice(firstPostIndex, lastPostIndex);

  return (
    <div>
      <Details
        setSearch={setSearch}
        search={search}
        services={services}
        setServices={setServices}
      ></Details>

      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 ">
        {currentPosts.map((currentPost) => (
          <ServicesCard
            key={currentPost.flight_number}
            service={currentPost}
          ></ServicesCard>
        ))}
      </div>
      <Pagination
        totalPosts={search !== "" ? searchData.length : services.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      ></Pagination>

      {/* <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 ">
        {currentPosts.map((currentPost) => (
          <ServicesCard
            key={currentPost.flight_number}
            service={currentPost}
          ></ServicesCard>
        ))}
      </div> */}
    </div>
  );
};

export default Services;
