import React from "react";
import "../Assets/Style/Component/Navbar.css";
import Dropdown from "../Components/Dropdown";
import ProjectName from "../Components/ProjectName";
import { BsFillPersonFill } from "react-icons/bs";
import {
  TECHNOLOGIES_OPTIONS_NAVBAR,
  STATUS_OPTIONS_NAVBAR,
} from "../Utility/Constant.js";

const Navbar = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="navbar_component">
      <ProjectName styling="projectName" />
      <div className="navbar_items">
        {props.heading === "true" ? (
          <input
            type="text"
            className="searchBar"
            placeholder="Search a blog"
            value={props.valueHeading}
            onChange={(e) => {
              const timer = setTimeout(() => {
                props.onChangeHeading(e.target.value);
              }, 1500);
              return () => clearTimeout(timer);
            }}
          />
        ) : (
          ""
        )}
        {props.technology === "true" ? (
          <Dropdown
            styling="dropdown_navbar_technology"
            options={TECHNOLOGIES_OPTIONS_NAVBAR}
            onChange={props.onChangeTechnology}
          />
        ) : (
          ""
        )}
        {props.status === "true" ? (
          <Dropdown
            styling="dropdown_navbar_status"
            options={STATUS_OPTIONS_NAVBAR}
            onChange={props.onChange}
            value={props.value}
          />
        ) : (
          ""
        )}
      </div>
      <div className="navbar_profile_name">
        <span>{user?.firstName}</span>
        <div className="navbar_profile_icon">
          <BsFillPersonFill />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
