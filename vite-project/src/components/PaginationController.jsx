import React from "react";
import "../styles/paginationController.scss";

const PaginationController = (props) => {
  const { dataLimit, setdataLimit, dataLimitError } = props;
  console.log(dataLimitError);
  return (
    <div className="paginationFooter">
      <div className="pagination">
        <div href="#">&laquo;</div>
        <div>
          <select name="cars" id="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
        </div>
        <div href="#">&raquo;</div>
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
