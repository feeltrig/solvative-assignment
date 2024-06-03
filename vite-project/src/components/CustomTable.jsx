import React from "react";
import "../styles/customTable.scss";
import PaginationController from "./PaginationController";
import Loader from "./Loader";

const CustomTable = (props) => {
  const {
    listing,
    headers,
    dataLimit,
    setdataLimit,
    searchQuery,
    dataLimitError,
    isFetchingData,
    currentPage,
    handlePageChange,
  } = props;
  return (
    <div className="tableContainer">
      {(searchQuery == "" || searchQuery == undefined || searchQuery == null) &&
        !isFetchingData && <>Start searching...</>}
      {listing &&
        listing.length > 0 &&
        searchQuery !== "" &&
        searchQuery !== undefined &&
        !isFetchingData &&
        searchQuery !== null && (
          <>
            <table>
              <thead>
                <tr>
                  {headers &&
                    headers.map((header, headerIndex) => {
                      return <th key={headerIndex}>{header.label}</th>;
                    })}
                </tr>
              </thead>

              {listing &&
                listing.map((listItem, listIndex) => {
                  return (
                    <tr key={listItem.id}>
                      <td>{listIndex + 1}</td>
                      <td>{listItem.name}</td>
                      <td>{listItem.country}</td>
                    </tr>
                  );
                })}
            </table>

            <PaginationController
              dataLimit={dataLimit}
              setdataLimit={setdataLimit}
              dataLimitError={dataLimitError}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          </>
        )}
      {listing && listing.length < 1 && !isFetchingData && (
        <div className="noDataScreen">No result found</div>
      )}
      {isFetchingData && <Loader />}
    </div>
  );
};

export default CustomTable;
