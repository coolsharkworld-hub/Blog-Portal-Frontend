import React from "react";
import "../Assets/Style/Component/ProjectName.css";

const ProjectName = (props) => {
  return (
    <div className={props.styling}>
      <span className="company">Blog </span>
      <span className="name">Portal</span>
    </div>
  );
};

export default ProjectName;
