import React, { useState } from "react";
import "../Assets/Style/Component/Input.css";

const Input = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState("");

  const handleValidate = (e) => {
    const regex = new RegExp(props.pattern);
    const inputValue = e.target.value;
    setInputValue(inputValue);
    if (regex.test(inputValue)) {
      setIsValid("");
      props.setStatus(true);
    } else {
      setIsValid(props.title);
      props.setStatus(false);
    }
  };

  return (
    <div className="input_component">
      <label className="input_label">
        <span className="error_message">* </span>
        {props.heading}
      </label>
      <input
        className="input_field"
        placeholder={props.placeholder}
        type={props.type}
        value={inputValue}
        onChange={(e) => {
          props.onChange(e);
          handleValidate(e);
        }}
        disabled={props.disabled}
        title={props.title}
      />
      <span className="error_message">{isValid}</span>
    </div>
  );
};

export default Input;
