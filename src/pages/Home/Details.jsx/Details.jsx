

import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";


const Details = ({
  setSearch,
  search,
  services,
  setFilteredServices,
  setCurrentPage
}) => {
  const [upcomings,setUpcomings]=useState(true)

  const handleCheck = () => {
    setUpcomings(!upcomings);
 if (upcomings === true) {
      console.log("filtering",)
      const filteredData = services.filter(
        (service) => service.upcoming === true
      );
      console.log("filteredData", filteredData);
      setFilteredServices(filteredData);
    } else{
      setFilteredServices(services)
    }
    
    
  };
  
  const handleStatus = (event) => {
    const selectedStatus = event.target.value;

    if (selectedStatus === "success") {
      const filteredData = services.filter(
        (service) => service.launch_success === true
      );
      setFilteredServices(filteredData);
    } else if (selectedStatus === "failure") {
      const filteredData = services.filter(
        (service) => service.launch_success === false
      );
      setFilteredServices(filteredData);
      setCurrentPage(1);
    }
  };
  const handleLaunching = (event) => {
    const selectedStatus = event.target.value;
    const currentDate = new Date(); 
    currentDate.setFullYear(currentDate.getFullYear() - 3);
    //Due to shortage of time data current date has been set to 3 years back

    if (selectedStatus === "lastWeek") {
      const lastWeekDate = new Date(currentDate);
      // 
      lastWeekDate.setDate(currentDate.getDate() - 7); // Calculate the date one week ago

      const filterDate = services.filter((service) => {
        const launchDate = new Date(service.launch_date_utc);
        
        return launchDate >= lastWeekDate && launchDate <= currentDate;
      });

      setFilteredServices(filterDate);
      setCurrentPage(1);
    } else if (selectedStatus === "lastMonth") {
      const lastMonthDate = new Date(currentDate);
      lastMonthDate.setMonth(currentDate.getMonth() - 1); // Calculate the date one month ago

      const filterDate = services.filter((service) => {
        const launchDate = new Date(service.launch_date_utc);
        return launchDate >= lastMonthDate && launchDate <= currentDate;
      });

      setFilteredServices(filterDate);
      setCurrentPage(1);
    } else if (selectedStatus === "lastYear") {
      const lastYearDate = new Date(currentDate);
      lastYearDate.setFullYear(currentDate.getFullYear() - 1); // Calculate the date one year ago

      const filterDate = services.filter((service) => {
        const launchDate = new Date(service.launch_date_utc);
        return launchDate >= lastYearDate && launchDate <= currentDate;
      });

      setFilteredServices(filterDate);
      setCurrentPage(1);
    }
  };


  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    
    <div>
      <div className="text-center mt-10">
        <h1 className="text-4xl font-medium text-[#212529] font-[barlow]">
          Spaceflight details
        </h1>
        <p
          className="font-[barlow] text-[#212529] mt-2"
          style={{ whiteSpace: "nowrap" }}
        >
          Find out the elaborate features of all the past big spaceflights.
        </p>
      </div>

      <div className="mt-14">
        <label
          className="cursor-pointer place-content-end"
          style={{ display: "flex", alignItems: "center" }}
        >
          <input value={1} onChange={handleCheck} type="checkbox" className="checkbox checkbox-primary" />
          <span className="pl-2 label-text">Show upcoming only</span>
        </label>
      </div>

      <div className="flex justify-between mt-5">
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full max-w-xs "
            style={{ borderBottomRightRadius: "0", borderTopRightRadius: "0" }}
            value={search}
            onChange={handleChange}
          />
          <button
            className="btn btn-info"
            style={{ borderBottomLeftRadius: "0", borderTopLeftRadius: "0" }}
          >
            <BiSearchAlt2 className="text-white text-xl"></BiSearchAlt2>
          </button>
        </div>

        <div className="flex justify-between space-x-4">
          <select
            onClick={handleStatus}
            className="select select-bordered w-full max-w-xs"
          >
            <option hidden disabled selected>
              By Launch Status
            </option>
            <option value="failure">Failure</option>
            <option value="success">Success</option>
          </select>
          <select
            onClick={handleLaunching}
            className="select select-bordered w-full max-w-xs"
          >
            <option hidden disabled selected>
              By Launch Date
            </option>
            <option value="lastWeek">Last Week</option>
            <option value="lastMonth">Last Month</option>
            <option value="lastYear">Last Years</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Details;

