import { useEffect, useState } from "react";
import "./App.css";
import CustomTable from "./components/CustomTable";
import SearchBox from "./components/SearchBox";
import "./styles/main.scss";
import axios from "axios";
import useDebounce from "./Functions/useDebounce";

function App() {
  const headers = [
    {
      label: "#",
      key: "Place Name",
    },
    {
      label: "Place Name",
      key: "name",
    },
    {
      label: "Country",
      key: "country",
    },
  ];

  const [dataLimit, setdataLimit] = useState(5);

  const [data, setdata] = useState([]);

  const staticData = {
    data: [
      {
        id: 147866,
        wikiDataId: "Q107941",
        type: "ADM2",
        city: "Central Delhi district",
        name: "Central Delhi district",
        country: "India",
        countryCode: "IN",
        region: "Delhi",
        regionCode: "DL",
        latitude: 28.645,
        longitude: 77.245,
        population: 582320,
      },
      {
        id: 3311555,
        wikiDataId: "Q5253088",
        type: "CITY",
        city: "Delakhari",
        name: "Delakhari",
        country: "India",
        countryCode: "IN",
        region: "Madhya Pradesh",
        regionCode: "MP",
        latitude: 22.4334,
        longitude: 78.6166,
        population: 0,
      },
      {
        id: 3453162,
        wikiDataId: "Q1353",
        type: "CITY",
        city: "Delhi",
        name: "Delhi",
        country: "India",
        countryCode: "IN",
        region: "Delhi",
        regionCode: "DL",
        latitude: 28.666666666,
        longitude: 77.216666666,
        population: 9879172,
      },
      {
        id: 3203689,
        wikiDataId: "Q1192604",
        type: "CITY",
        city: "Delhi Cantonment",
        name: "Delhi Cantonment",
        country: "India",
        countryCode: "IN",
        region: "Delhi",
        regionCode: "DL",
        latitude: 28.59025,
        longitude: 77.131919444,
        population: 0,
      },
      {
        id: 56192,
        wikiDataId: "Q16999192",
        type: "CITY",
        city: "Delwada",
        name: "Delwada",
        country: "India",
        countryCode: "IN",
        region: "Gujarat",
        regionCode: "GJ",
        latitude: 20.7833,
        longitude: 71.05,
        population: 11912,
      },
    ],
    links: [
      {
        rel: "first",
        href: "/v1/geo/cities?offset=0&limit=5&countryIds=IN&namePrefix=del",
      },
      {
        rel: "next",
        href: "/v1/geo/cities?offset=5&limit=5&countryIds=IN&namePrefix=del",
      },
      {
        rel: "last",
        href: "/v1/geo/cities?offset=10&limit=5&countryIds=IN&namePrefix=del",
      },
    ],
    metadata: {
      currentOffset: 0,
      totalCount: 13,
    },
  };

  // search box
  const [searchQuery, setsearchQuery] = useState("");
  const [filteredData, setfilteredData] = useState(staticData.data);

  // search data limit error
  const [dataLimitError, setDataLimitError] = useState("");
  const [isFetchingData, setisFetchingData] = useState(false);
  const [currentPage, setcurrentPage] = useState(0);

  const fetchListingData = (dataLimit, currentPage) => {
    setisFetchingData(true);
    var options = {
      method: "GET",
      url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
      params: {
        countryIds: "IN",
        namePrefix: "del",
        limit: dataLimit,
        offset: currentPage,
        namePrefix: searchQuery !== "" ? searchQuery : "",
      },
      headers: {
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        "x-rapidapi-key": import.meta.env.VITE_API_KEY,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setfilteredData(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(() => setisFetchingData(false));
  };

  useDebounce(
    () => {
      if (dataLimit > 0 && !isNaN(dataLimit) && dataLimit < 11) {
        fetchListingData(dataLimit, currentPage);
      }
    },
    [dataLimit, currentPage, searchQuery],
    800
  );

  const handleSearch = (e) => {
    setsearchQuery(e.target.value);
    setcurrentPage(0);
  };

  const handleDataLimit = (e) => {
    setdataLimit(e.target.value);
    if (!isNaN(e.target.value) && e.target.value > 10) {
      setDataLimitError("Please enter limit less than 10");
    } else {
      setDataLimitError("");
    }
  };

  const handlePageChange = (val) => {
    if (val == "inc") {
      setcurrentPage((prev) => prev + 1);
      return;
    } else if (currentPage > 1) {
      setcurrentPage(0);
      return;
    }
  };

  return (
    <div className="mainContainer">
      <SearchBox value={searchQuery} onChange={handleSearch} />
      <CustomTable
        headers={headers}
        listing={filteredData}
        dataLimit={dataLimit}
        setdataLimit={handleDataLimit}
        searchQuery={searchQuery}
        dataLimitError={dataLimitError}
        isFetchingData={isFetchingData}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
