import React from "react";
import "../styles/customTable.scss";
import PaginationController from "./PaginationController";

const CustomTable = (props) => {
  const {
    listing,
    headers,
    dataLimit,
    setdataLimit,
    searchQuery,
    dataLimitError,
  } = props;
  return (
    <div className="tableContainer">
      {(searchQuery == "" ||
        searchQuery == undefined ||
        searchQuery == null) && <>Start searching...</>}
      {listing &&
        listing.length > 0 &&
        searchQuery !== "" &&
        searchQuery !== undefined &&
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
                    <tr>
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
            />
          </>
        )}
      {listing && listing.length < 1 && (
        <div className="noDataScreen">No result found</div>
      )}
    </div>
  );
};

export default CustomTable;
