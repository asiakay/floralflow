import React from 'react';
import Button from './Button';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePreviousClick = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination">
      <Button
        text="Previous"
        onClick={handlePreviousClick}
        disabled={currentPage === 1}
      />
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        text="Next"
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};

export default Pagination;
