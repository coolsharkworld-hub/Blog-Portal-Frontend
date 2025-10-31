import React from "react";
import ReactDOM from "react-dom";
import "../Assets/Style/Component/Popup.css";
import Button from "../Components/Button";
import { PiWarningCircleThin } from "react-icons/pi";
import { PiWarningLight } from "react-icons/pi";

const Popup = (props) => {
  return ReactDOM.createPortal(
    <>
      <div className="popup_wrapper"></div>
      <div className="popup_parent">
        <div className="popup_container">
          <div className="popup_icon">
            {props.button1 === "Delete" ? (
              <PiWarningCircleThin />
            ) : (
              <PiWarningLight />
            )}
          </div>
          <h1 className="popup_heading">{props.heading}</h1>
          <p className="popup_message">{props.paragraph}</p>
          <div className="displayflex">
            <Button
              styling="popup_button_red popup_button"
              heading={props.button1}
              onClick={() => {
                props.setIsDeleted(true);
                props.closePopup();
              }}
            />
            <Button
              styling="popup_button_blue popup_button"
              heading={props.button2}
              onClick={() => {
                props.setIsDeleted(false);
                props.closePopup();
              }}
            />
          </div>
        </div>
      </div>
    </>,
    document.querySelector(".popup_div")
  );
};

export default Popup;
