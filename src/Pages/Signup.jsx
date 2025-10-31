import React from "react";
import "../Assets/Style/Pages/Signup.css";
import Input from "../Components/Input";
import ProjectName from "../Components/ProjectName";
import Dropdown from "../Components/Dropdown";
import Button from "../Components/Button";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { signUpService } from "../Service/UserService";
import { useNavigate } from "react-router-dom";
import {
  DESIGNATION_OPTIONS,
  GENDER_OPTIONS,
  EMAIL_REGEX,
  NAME_REGEX,
  MOBILE_REGEX,
  PASSWORD_REGEX,
} from "../Utility/Constant.js";

const Home = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confrimPassword, setConfrimPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState(DESIGNATION_OPTIONS[0].value);
  const [gender, setGender] = useState(GENDER_OPTIONS[0].value);
  const [isFirstNameSubmitable, setIsFirstName] = useState(false);
  const [isLastNameSubmitable, setIsLastNameSubmitable] = useState(false);
  const [isEmailSubmitable, setIsEmailSubmitable] = useState(false);
  const [isMobileSubmitable, setIsMobileSubmitable] = useState(false);
  const [isPasswordSubmitable, setIsPasswordSubmitable] = useState(false);
  const [isConfrimPasswordSubmitable, setIsConfrimPasswordSubmitable] =
    useState(false);
  const [isCPasswordSubmitable, setIsCPasswordSubmitable] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSignup = (e) => {
    e.preventDefault();
    if (
      isFirstNameSubmitable &&
      isLastNameSubmitable &&
      isEmailSubmitable &&
      isMobileSubmitable &&
      isPasswordSubmitable &&
      isConfrimPasswordSubmitable &&
      isCPasswordSubmitable
    ) {
      const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobile: mobile,
        password: btoa(password),
        designation: designation,
        gender: gender,
      };

      signUpService(data)
        .then((response) => {
          toast.success(response.data.message);
          navigate("/login");
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

  const handleConfirmPasswordChange = (e) => {
    const currentPassword = e.target.value;
    if (password !== currentPassword && confrimPassword !== currentPassword) {
      setIsCPasswordSubmitable(false);
      setPasswordError("Passwords do not match");
    } else {
      setIsCPasswordSubmitable(true);
      setPasswordError("");
    }
  };

  useEffect(() => {
    document.title = "Blog Portal | Registration";
    if (user?.role === "Admin") {
      navigate("/unreviewed");
    } else if (user?.role === "Employee") {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  }, [navigate, user?.role, user]);

  return (
    <div className="signup_div">
      <div className="signup_base">
        <form onSubmit={handleSignup}>
          <ProjectName styling="project_name" />
          <div>
            <h1 className="signup_heading">SignUp</h1>
          </div>
          <div className="signup_row">
            <div className="signup_column">
              <div className="signup_input">
                <Input
                  heading="First Name"
                  placeholder="Enter your first name"
                  pattern={NAME_REGEX}
                  type="text"
                  title="First Name 3-15 alphabets are required"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  status={isFirstNameSubmitable}
                  setStatus={setIsFirstName}
                />
              </div>
            </div>
            <div className="signup_column">
              <div className="signup_input">
                <Input
                  heading="Last Name"
                  placeholder="Enter your last name"
                  pattern={NAME_REGEX}
                  type="text"
                  title="First Name 3-15 alphabets are required"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  status={isLastNameSubmitable}
                  setStatus={setIsLastNameSubmitable}
                />
              </div>
            </div>
          </div>
          <div className="signup_row">
            <div className="signup_column">
              <div className="signup_input">
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
            </div>
            <div className="signup_column">
              <div className="mobile_div signup_input">
                <div className="mobile_column1">
                  <label className="input_label">Code</label>
                  <input
                    className="code_field input_field"
                    required
                    value="+91"
                    disabled
                  />
                </div>
                <div className="mobile_column2">
                  <Input
                    heading="Mobile Number"
                    placeholder="Enter your mob number"
                    pattern={MOBILE_REGEX}
                    title="Minimum 10 digits, starting with 6-9."
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    status={isMobileSubmitable}
                    setStatus={setIsMobileSubmitable}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="signup_row">
            <div className="signup_column">
              <div className="signup_input">
                <Input
                  heading="Password"
                  type="password"
                  placeholder="Enter your password"
                  pattern={PASSWORD_REGEX}
                  title="8-16 chars with uppercase,lowercase,digit,special char."
                  value={password}
                  onChange={(e) => {
                    handleConfirmPasswordChange(e);
                    setPassword(e.target.value);
                  }}
                  status={isPasswordSubmitable}
                  setStatus={setIsPasswordSubmitable}
                />
              </div>
            </div>
            <div className="signup_column">
              <div className="signup_input">
                <Input
                  heading="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  value={confrimPassword}
                  onChange={(e) => {
                    handleConfirmPasswordChange(e);
                    setConfrimPassword(e.target.value);
                  }}
                  title=" must be between 8-16 characters"
                  status={isConfrimPasswordSubmitable}
                  setStatus={setIsConfrimPasswordSubmitable}
                />
                <span className="error_message">{passwordError}</span>
              </div>
            </div>
          </div>
          <div className="signup_row dropdown">
            <div className="signup_column">
              <div className="dropdown_label">Gender</div>
              <Dropdown
                styling="signup_dropdown"
                options={GENDER_OPTIONS}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              />
            </div>
            <div className="signup_column">
              <div className="dropdown_label">Designation</div>
              <Dropdown
                styling="signup_dropdown"
                options={DESIGNATION_OPTIONS}
                onChange={(e) => setDesignation(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Button heading="Register" type="submit" styling="button" />
          </div>
          <p>
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="authentication_links"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Home;
