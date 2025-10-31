import React, { useEffect } from "react";
import "../Assets/Style/Pages/Home.css";
import Button from "../Components/Button";
import ProjectName from "../Components/ProjectName";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const HandleSignup = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  const HandleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  useEffect(() => {
    document.title = "Blog Portal | Home";
    if (user?.role === "ADMIN") {
      navigate("/unreviewed");
    } else if (user?.role === "EMPLOYEE") {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [navigate, user?.role, user]);

  return (
    <div className="home_row">
      <div className="home_column home_column1">
        <div className="home_base">
          <ProjectName styling="home_project_name" />
          <div className="field">
            <Button
              heading="LogIn"
              styling="home_button"
              onClick={HandleLogin}
            />
          </div>
          <div className="field">
            <Button
              heading="SignUp"
              styling="home_button"
              onClick={HandleSignup}
            />
          </div>
        </div>
      </div>
      <div className="home_column home_column2">
        <div className="home_image" />
      </div>
    </div>
  );
};

export default Home;
