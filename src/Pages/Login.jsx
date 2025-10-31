import React, { useEffect } from "react";
import "../Assets/Style/Pages/Login.css";
import Input from "../Components/Input";
import ProjectName from "../Components/ProjectName";
import Button from "../Components/Button";
import { toast } from "react-toastify";
import { useState } from "react";
import { loginService } from "../Service/UserService";
import { useNavigate } from "react-router-dom";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../Utility/Constant.js";

const Login = ({ setUserLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailSubmitable, setIsEmailSubmitable] = useState(false);
  const [isPasswordSubmitable, setIsPasswordSubmitable] = useState(false);
  const [submitable, setSubmitable] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    document.title = "Blog Portal | Login";
    if (user?.role === "ADMIN") {
      navigate("/unreviewed");
    } else if (user?.role === "EMPLOYEE") {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate, user?.role, user]);

  const handleLogin = (e) => {
    e.preventDefault();
    handleSubmitable();

    if (submitable) {
      const data = {
        email: email,
        password: btoa(password),
      };

      loginService(data)
        .then((response) => {
          toast.success("Login Successfully");
          localStorage.setItem("user", JSON.stringify(response.data));
          setUserLoggedIn(response.data);
          const user = JSON.parse(localStorage.getItem("user"));
          if (user.role === "ADMIN") {
            navigate("/unreviewed");
          } else if (user.role === "EMPLOYEE") {
            navigate("/dashboard");
          }
        })
        .catch((error) => {
          if (error.response) {
            toast.error(error.response.data.message);
          } else {
            toast.error(error.message);
          }
        });
    } else {
      toast.warn("Please enter valid details.");
    }
  };

  const handleSubmitable = () => {
    if (isEmailSubmitable && isPasswordSubmitable) {
      setSubmitable(true);
    } else {
      setSubmitable(false);
    }
  };

  return (
    <div className="login_div">
      <div className="login_base">
        <form onSubmit={handleLogin}>
          <ProjectName styling="project_name" />
          <div>
            <h1 className="login_heading">Login</h1>
          </div>
          <div className="login_input">
            <Input
              heading="Email ID"
              placeholder="Enter your email address"
              pattern={EMAIL_REGEX}
              title="Email ID ends with @nucleusteq.com"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              status={isEmailSubmitable}
              setStatus={setIsEmailSubmitable}
            />
          </div>
          <div className="login_input">
            <Input
              heading="Password"
              type="password"
              placeholder="Enter your password"
              pattern={PASSWORD_REGEX}
              title="Password must have 8-16 chars with uppercase,lowercase,digit,special char."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              status={isPasswordSubmitable}
              setStatus={setIsPasswordSubmitable}
            />
          </div>
          <Button
            heading="Login"
            styling="button"
            onClick={handleSubmitable}
            type="submit"
          />
          <p>
            Don't have an account?
            <span
              onClick={() => navigate("/signup")}
              className="authentication_links"
            >
              Signup
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
