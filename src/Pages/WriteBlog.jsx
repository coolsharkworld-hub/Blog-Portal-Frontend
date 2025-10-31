import React, { useEffect, useState } from "react";
import "../Assets/Style/Pages/WriteBlog.css";
import ReactQuill from "react-quill";
import Button from "../Components/Button";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Dropdown from "../Components/Dropdown";
import { toast } from "react-toastify";
import { addPostService } from "../Service/PostService";
import {
  TECHNOLOGIES_OPTIONS,
  TOOLBAR_OPTIONS,
  BLOG_HEADING_REGEX,
} from "../Utility/Constant.js";
import { useNavigate } from "react-router-dom";

const WriteBlog = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [heading, setHeading] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [technology, setTechnology] = useState("JAVA");
  const [error, setError] = useState(" ");
  const navigate = useNavigate();

  const module = {
    toolbar: TOOLBAR_OPTIONS,
  };

  const handleError = (headingValue) => {
    const value = headingValue.trim();
    const regex = new RegExp(BLOG_HEADING_REGEX);
    if (regex.test(value)) {
      setError("");
    } else {
      setError("Minimum 3 characaters are required");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      heading: heading,
      technology: technology,
      paragraph: paragraph,
      userId: user.userId,
    };

    if (error === "") {
      addPostService(data)
        .then((response) => {
          toast(response.data.message);
          navigate("/myblogs");
        })
        .catch((error) => {
          if (error.response) {
            toast.error(error.response.data.message);
          } else {
            toast.error(error.message);
          }
        });
    } else {
      toast.warn("please enter valid details");
    }
  };

  useEffect(() => {
    document.title = "Blog Portal | Write Blog";
  }, []);

  return (
    <div className="parent_div">
      <Navbar />
      <div className="sidebar_content">
        <Sidebar />
        <div className="page_content">
          <div className="write_blog">
            <p className="writeblog_heading">Write your blog</p>
            <Dropdown
              styling="writeblog_update_blog_dropdown"
              options={TECHNOLOGIES_OPTIONS}
              onChange={(e) => setTechnology(e.target.value)}
            />
            <input
              type="text"
              className="writeblog_post_heading"
              placeholder="Write you Heading here..."
              value={heading}
              onChange={(e) => {
                setHeading(e.target.value);
                handleError(e.target.value);
              }}
            />
            <span className="error_message">{error}</span>
            <div className="richtext_div">
              <ReactQuill
                modules={module}
                theme="snow"
                value={paragraph}
                onChange={setParagraph}
                placeholder="Write your description here..."
                className="richtext"
              />
            </div>
            <div className="post_btn">
              <Button heading="Post" styling="button" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteBlog;
