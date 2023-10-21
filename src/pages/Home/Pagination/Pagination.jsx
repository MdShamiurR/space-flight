import { useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./Pagination.css";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  const goToPage = (page) => {
    if (page >= 1 && page <= pages.length) {
      setCurrentPage(page);
      localStorage.setItem("currentPage", page);
    }
  };


  useEffect(() => {
    const storedPage = localStorage.getItem("currentPage");
    if (storedPage) {
      setCurrentPage(parseInt(storedPage));
    }
  }, [setCurrentPage]);

  return (
    <div className="pagination mt-12">
      <button onClick={() => goToPage(currentPage - 1)}>
        <FiChevronLeft />
      </button>
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => goToPage(page)}
          className={page === currentPage ? "active" : ""}
        >
          {page}
        </button>
      ))}
      <button onClick={() => goToPage(currentPage + 1)}>
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
