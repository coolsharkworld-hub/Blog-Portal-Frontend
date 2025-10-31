import React, { useEffect, useState } from "react";
import "../Assets/Style/Pages/WriteBlog.css";
import Button from "../Components/Button";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import ReactQuill from "react-quill";
import Dropdown from "../Components/Dropdown";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  TECHNOLOGIES_OPTIONS,
  TOOLBAR_OPTIONS,
  BLOG_HEADING_REGEX,
} from "../Utility/Constant.js";
import {
  getPostByPostIdService,
  updatePostService,
} from "../Service/PostService";

const UpdateBlog = () => {
  const navigate = useNavigate();
  const [heading, setHeading] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [technology, setTechnology] = useState("JAVA");
  const { blogId } = useParams();
  const [error, setError] = useState("");

  const module = {
    toolbar: TOOLBAR_OPTIONS,
  };

  const handleError = (headingValue) => {
    const value = headingValue;
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
      postId: blogId,
      heading: heading,
      technology: technology,
      paragraph: paragraph,
    };

    if (error === "") {
      updatePostService(data)
        .then((response) => {
          navigate("/myblogs");
          toast(response.data.message);
          const post = response.data;
          setHeading(post.heading);
          setParagraph(post.paragraph);
          setTechnology(post.technology);
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
    document.title = "Blog Portal | Update Blog";
  }, []);

  useEffect(() => {
    getPostByPostIdService(blogId)
      .then((response) => {
        toast(response.data);
        const post = response.data;
        setHeading(post.heading);
        setParagraph(post.paragraph);
        setTechnology(post.technology);
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
      });
  }, [blogId]);

  return (
    <div className="parent_div">
      <Navbar />
      <div className="sidebar_content">
        <Sidebar />
        <div className="page_content">
          <div className="write_blog">
            <p className="writeblog_heading">Update your blog</p>
            <Dropdown
              styling="writeblog_update_blog_dropdown"
              options={TECHNOLOGIES_OPTIONS}
              value={technology}
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
                onChange={(value) => {
                  setParagraph(value);
                }}
                className="richtext"
                placeholder="Write your description here..."
              />
            </div>
            <div className="post_btn">
              <Button
                heading="Update"
                styling="button"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
