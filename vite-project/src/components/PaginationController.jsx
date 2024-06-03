import React from "react";
import "../styles/paginationController.scss";

const PaginationController = (props) => {
  const {
    dataLimit,
    setdataLimit,
    dataLimitError,
    currentPage,
    handlePageChange,
  } = props;
  return (
    <div className="paginationFooter">
      <div className="pagination">
        <div onClick={() => handlePageChange("dec")}>&laquo;</div>
        <div>{currentPage + 1}</div>
        <div onClick={() => handlePageChange("inc")}>&raquo;</div>
      </div>

      <div className="dataLimit">
        <input
          type="number"
          min={5}
          max={10}
          value={dataLimit}
          onChange={setdataLimit}
        />
        {dataLimitError !== "" && <div>{dataLimitError}</div>}
      </div>
    </div>
  );
};

export default PaginationController;
