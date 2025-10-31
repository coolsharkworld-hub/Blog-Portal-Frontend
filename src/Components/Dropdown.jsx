import React from "react";
import "../Assets/Style/Component/Dropdown.css";

const DropdownComponent = (props) => {
  return (
    <div className="dropdown_div">
      <select
        onChange={props.onChange}
        className={props.styling}
        value={props.value}
      >
        {props.options.map((option, index) => (
          <option key={index} value={option.value} className="dropdown_options">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownComponent;
