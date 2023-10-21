
import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";


const Details = ({
  setSearch,
  search,
  services,
  setFilteredServices,
  setCurrentPage,
  
}) => {
  const [upcomings, setUpcomings] = useState(false);

const handleCheck = (currentState) => {
  if (currentState) {
    console.log("1st consol", currentState);
    console.log(services)
    const filteredData = services.filter(
      (service) => service.upcoming === true
      
    );
    console.log("2nd filteredData", filteredData);
    setFilteredServices(filteredData);
    setUpcomings(true);
  } else if (!currentState) {
    // Reset filteredServices to original data
    console.log("2nd currentState", currentState);
    console.log("not services", services);
    setFilteredServices(services);
    console.log("3nd currentState", currentState);
    console.log("services", services);
    setUpcomings(false);
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
      <div className="text-center mt-20">
        <h1 className="text-4xl font-medium text-[#212529]">
          Spaceflight details
        </h1>
        <p className=" text-[#212529] mt-2" style={{ whiteSpace: "nowrap" }}>
          Find out the elaborate features of all the past big spaceflights.
        </p>
      </div>

      <div className="mt-14">
        <label
          className="cursor-pointer place-content-end "
          style={{ display: "flex", alignItems: "center" }}
        >
          <input
            value={1}
            onChange={() => handleCheck(!upcomings)}
            type="checkbox"
            className="checkbox rounded-md"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0)",
              width: "16px",
              height: "16px",
            }}
          />
          <span className="pl-2 text-xs">Show upcoming only</span>
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
            className="btn  btn-primary"
            style={{
              borderBottomLeftRadius: "0",
              borderTopLeftRadius: "0",
              backgroundColor: "#0D6EFD",
              border: "1px solid white",
            }}
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

