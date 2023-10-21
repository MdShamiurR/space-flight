
import { BiSearchAlt2 } from "react-icons/bi";


const Details = ({ setSearch, search, services, setServices }) => {
  const { launch_success } = services;

  const handleStatus = (event) => {
    const selectedStatus = event.target.value;
    if (selectedStatus === "failure" || selectedStatus === "success") {
      // Filter services based on selected launch status
      const filteredServices = services.filter((service) => {
        if (selectedStatus === "failure") {
          return !service.launch_success;
        } else {
          return service.launch_success;
        }
      });
      setServices(filteredServices);
    }
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    //   <div className="max-w-7xl mx-auto  mt-10">
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
          <input type="checkbox" className="checkbox checkbox-primary" />
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
          <select className="select select-bordered w-full max-w-xs">
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
