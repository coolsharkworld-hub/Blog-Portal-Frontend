import React from "react";
import "../Assets/Style/Component/Button.css";

const ButtonNew = (props) => {
  return (
    <div>
      <button
        type={props.type}
        className={props.styling}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.heading}
      </button>
    </div>
  );
};

export default ButtonNew;
