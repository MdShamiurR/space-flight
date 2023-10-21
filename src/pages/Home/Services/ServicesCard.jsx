import formatDateToDDMMMMYYYY from "../../../helper/DateHelper";
import "../../../Shared/FontFamily/FontFamily.css";

const ServicesCard = ({ service }) => {
  const { launch_date_utc, mission_name, launch_success } = service;
  const launchDate = new Date(launch_date_utc);
  const formattedLaunchDate = formatDateToDDMMMMYYYY(launchDate);

  return (
    <div className="card  bg-base-100 border-gray-400 border rounded-lg">
      <figure className="px-10 pt-10">
        <img
          src={service.links.mission_patch_small}
          alt="Mission Patch"
          className="rounded-xl w-32"
        />
      </figure>
      <div className="card-body items-center text-center">
        <p className="">
          <span className="text-[#6C757D]">Launch Date:</span>
          <span className="text-[#343A40]">{formattedLaunchDate}</span>
        </p>
        <h2 className="text-2xl text-[#212529]">{mission_name}</h2>
        <p>{service.rocket.rocket_id}</p>
        <p className="mt-7 ">
          <span className="font-[barlow]">Launch Status:</span> <br />
          {launch_success ? (
            <span className="bg-[#198754] text-white p-1 rounded px-3 text-xs select-helvetica">
              Success
            </span>
          ) : (
            <span className="bg-[#DC3545] text-white p-1 rounded px-3 text-xs select-helvetica">
              Failed
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ServicesCard;

