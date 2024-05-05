import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const siblingCount = 1;
  const pagesToShow = Math.min(siblingCount * 2 + 1, totalPages);
  const startPage = Math.min(Math.max(currentPage - siblingCount, 1), totalPages - pagesToShow + 1);

  return (
    <div className="pagination">
      {startPage > 1 && (
        <button onClick={() => onPageChange(1)}>1</button>
      )}
      {startPage > 2 && (
        <span className="ellipsis">...</span>
      )}
      {Array.from({ length: pagesToShow }, (_, i) => (
        <button key={startPage + i} onClick={() => onPageChange(startPage + i)} className={currentPage === startPage + i ? "active" : ""}>
          {startPage + i}
        </button>
      ))}
      {startPage + pagesToShow <= totalPages && (
        <span className="ellipsis">...</span>
      )}
      {startPage + pagesToShow <= totalPages && (
        <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
      )}
    </div>
  );
}

export default Pagination;
