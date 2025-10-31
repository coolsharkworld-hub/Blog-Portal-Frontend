import React from "react";
import "../Assets/Style/Component/Sidebar.css";
import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { GoPencil } from "react-icons/go";
import { TbBrandBlogger } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { TbFlag3Filled } from "react-icons/tb";
import Button from "../Components/Button";

const Sidebar = (props) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="sidebar_component">
      {props.admin === "true" ? (
        <div className="sidebar_options">
          <NavLink className="sidebar_item" to={"/unreviewed"}>
            <BiSolidDashboard className="sidebar_icons" />
            <span>Unreviewed</span>
          </NavLink>
          <NavLink className="sidebar_item" to={"/reported"}>
            <TbFlag3Filled className="sidebar_icons" />
            <span>Reported Blogs</span>
          </NavLink>
        </div>
      ) : (
        <div className="sidebar_options">
          <NavLink className="sidebar_item" to={"/dashboard"}>
            <RxDashboard className="sidebar_icons" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink className="sidebar_item" to={"/writeblog"}>
            <GoPencil className="sidebar_icons" />
            <span>Write new Blog</span>
          </NavLink>
          <NavLink className="sidebar_item" to={"/myblogs"}>
            <TbBrandBlogger className="sidebar_icons" />
            <span>My Blogs</span>
          </NavLink>
        </div>
      )}
      <div className="sidebar_logout_btn" onClick={handleLogoutClick}>
        <Button heading="Logout" styling="logout_button" />
        <IoMdLogOut className="sidebar_logout_icons" />
      </div>
    </div>
  );
};

export default Sidebar;
