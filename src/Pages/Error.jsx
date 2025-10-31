import React, { useEffect } from "react";
import "../Assets/Style/Pages/Error.css";

const Error = () => {
  useEffect(() => {
    document.title = "Blog Portal | Error";
  }, []);

  return <div className="errorDiv" />;
};

export default Error;
