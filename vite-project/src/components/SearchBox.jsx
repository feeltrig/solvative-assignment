import React, { useEffect } from "react";
import "../styles/searchBox.scss";

const SearchBox = (props) => {
  const { onChange, value } = props;
  useEffect(() => {
    window.addEventListener("keydown", function (e) {
      console.log(e, e.ctrlKey && e.key == "/");
      if (e.keyCode === 114 || (e.ctrlKey && e.key === "/")) {
        if (document.getElementById("searchInput") !== document.activeElement) {
          e.preventDefault();
          console.log("Search is not in focus");
          document.getElementById("searchInput").focus();
        } else {
          console.log("Default action of CtrlF");
          return true;
        }
      }
    });
  }, []);

  return (
    <div className="searchBoxContainer">
      <input
        id="searchInput"
        className="searchBox"
        placeholder="Search places..."
        value={value}
        onChange={onChange}
      />
      <div className="keyboard-shortcut">Ctrl + /</div>
    </div>
  );
};

export default SearchBox;
