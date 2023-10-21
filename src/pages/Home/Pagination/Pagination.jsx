
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
  const maxPageNumbers = 5; // Maximum number of page numbers to display

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
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FiChevronLeft />
      </button>
      {pages.map((page, index) => {
        if (pages.length > maxPageNumbers) {
          if (
            (page >= currentPage - 2 && page <= currentPage + 2) ||
            page === 1 ||
            page === pages.length
          ) {
            return (
              <button
                key={index}
                onClick={() => goToPage(page)}
                className={page === currentPage ? "active" : ""}
              >
                {page}
              </button>
            );
          } else if (page === currentPage - 3 || page === currentPage + 3) {
            return (
              <button
                style={{ fontWeight: "bold" }}
                key={index}
              >
                ...
              </button>
            );
          }
        } else {
          return (
            <button
              key={index}
              onClick={() => goToPage(page)}
              className={page === currentPage ? "active" : ""}
            >
              {page}
            </button>
          );
        }
        return null;
      })}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === pages.length}
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Pagination;

