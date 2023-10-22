


import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import "../../../Shared/FontFamily/FontFamily.css";

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
      const filteredData = services.filter(
        (service) => service.upcoming === true
      );
      setFilteredServices(filteredData);
      setUpcomings(true);
    } else if (!currentState) {
      // Reset filteredServices to original data
      setFilteredServices(services);
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

    if (selectedStatus === "lastWeek") {
      const lastWeekDate = new Date(currentDate);
      lastWeekDate.setDate(currentDate.getDate() - 7);

      const filterDate = services.filter((service) => {
        const launchDate = new Date(service.launch_date_utc);

        return launchDate >= lastWeekDate && launchDate <= currentDate;
      });

      setFilteredServices(filterDate);
      setCurrentPage(1);
    } else if (selectedStatus === "lastMonth") {
      const lastMonthDate = new Date(currentDate);
      lastMonthDate.setMonth(currentDate.getMonth() - 1);

      const filterDate = services.filter((service) => {
        const launchDate = new Date(service.launch_date_utc);
        return launchDate >= lastMonthDate && launchDate <= currentDate;
      });

      setFilteredServices(filterDate);
      setCurrentPage(1);
    } else if (selectedStatus === "lastYear") {
      const lastYearDate = new Date(currentDate);
      lastYearDate.setFullYear(currentDate.getFullYear() - 1);

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
    setCurrentPage(1);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="text-center mt-4 md:mt-20">
        <h1 className="text-2xl md:text-4xl font-medium text-[#212529]">
          Spaceflight details
        </h1>
        <p
          className="text-xs md:text-[#212529] mt-2"
          style={{ whiteSpace: "nowrap" }}
        >
          Find out the elaborate features of all the past big spaceflights.
        </p>
      </div>

      <div className="mt-4  w-full flex flex-col  md:items-end lg:items-end ">
        <div className=" md:mt-14  ">
          <label
            className="cursor-pointer"
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
      </div>

      <div className="flex flex-col md:flex-row justify-between md:mt-5 mt-5 ">
        <div
          style={{ display: "flex", alignItems: "center" }}
          className="mb-4 md:mb-0 "
        >
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full max-w-xs md:max-w-full"
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

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <select
            onClick={handleStatus}
            className="select select-bordered w-full max-w-xs md:max-w-full select-helvetica"
          >
            <option hidden disabled selected>
              By Launch Status
            </option>
            <option value="failure">Failure</option>
            <option value="success">Success</option>
          </select>
          <select
            onClick={handleLaunching}
            className="select select-bordered w-full max-w-xs md:max-w-full select-helvetica"
          >
            <option hidden disabled selected>
              By Launch Date
            </option>
            <option value="lastWeek">Last Week</option>
            <option value="lastMonth">Last Month</option>
            <option value="lastYear">Last Year</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Details;
