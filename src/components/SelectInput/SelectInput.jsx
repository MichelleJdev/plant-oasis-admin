import React from "react";
import "./SelectInput.css";

function SelectInput({
  selectName,
  options,
  handleChange,
  selected,
  initialValue,
}) {
  return (
    <div className="SelectInput">
      <select name={selectName} onChange={handleChange} id={selectName}>
        {options.map(({ label, value }) => (
          <option
            key={value}
            value={value}
            selected={
              !selected ? (value === initialValue ? true : false) : false
            }
          >
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
