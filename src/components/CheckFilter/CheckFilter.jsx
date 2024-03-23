import React from "react";
import "./CheckFilter.css";

function CheckFilter({
  loading,
  text,
  checkedVals,
  setCheckedVals,
  possibleValues,
}) {
  const handleChange = (evt) => {
    const { value, checked } = evt.target;
    if (checked) {
      setCheckedVals((prevVals) => [...prevVals, value]);
    } else {
      setCheckedVals((prevVals) => [
        ...prevVals.filter((val) => val !== value),
      ]);
    }
  };
  return (
    <div className="CheckFilter">
      <p>{loading ? "Loading filters" : text}</p>
      <div className="filter-list">
        {possibleValues.map((val) => (
          <div className="checkbox-group" key={val._id}>
            <label
              className={checkedVals.includes(val._id) ? "checked" : ""}
              htmlFor={val._id}
            >
              {val.name}
            </label>
            <input
              type="checkbox"
              name={val._id}
              id={val._id}
              value={val._id}
              onChange={handleChange}
              checked={checkedVals.includes(val._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CheckFilter;
