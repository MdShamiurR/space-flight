import Details from "./Details.jsx/Details";
import Pagination from "./Pagination/Pagination";
import Services from "./Services/services";


const Home = () => {
  return (
    //   <div className="max-w-7xl mx-auto  mt-10">
    <div>
      
      <Details></Details>
      <Services></Services>
      <Pagination></Pagination>
    </div>
  );
};

export default Home;
