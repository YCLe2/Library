import React, { useState } from "react";

const Pagination = ({ booksPerPage, totalBooks, paginate, currentPage }) => {
  const [currentPageGroup, setCurrentPageGroup] = useState(0);
  const pagesPerGroup = 10;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  const currentGroupPages = pageNumbers.slice(
    currentPageGroup * pagesPerGroup,
    (currentPageGroup + 1) * pagesPerGroup
  );

  const handleNextGroup = () => {
    setCurrentPageGroup(currentPageGroup + 1);
    paginate((currentPageGroup + 1) * pagesPerGroup + 1);
  };

  const handlePreviousGroup = () => {
    setCurrentPageGroup(currentPageGroup - 1);
    paginate(currentPageGroup * pagesPerGroup);
  };

  return (
    <nav>
      <ul className="pagination justify-content-center custom-pagination">
        {currentPageGroup > 0 && (
          <li className="page-item">
            <a onClick={handlePreviousGroup} href="#" className="page-link">
              &lt;&lt;
            </a>
          </li>
        )}
        {currentGroupPages.map(number => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <a onClick={() => paginate(number)} href="#" className="page-link">
              {number}
            </a>
          </li>
        ))}
        {(currentPageGroup + 1) * pagesPerGroup < pageNumbers.length && (
          <li className="page-item">
            <a onClick={handleNextGroup} href="#" className="page-link">
              &gt;&gt;
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;