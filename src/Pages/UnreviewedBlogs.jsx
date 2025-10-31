import React, { useEffect } from "react";
import Button from "../Components/Button";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  getAllUnapprovedPost,
  postApprovalService,
} from "../Service/PostService";

const UnreviewedBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const handleStatusClick = (blogId, status) => {
    const data = {
      postId: blogId,
      status: status,
    };

    postApprovalService(data)
      .then((response) => {
        toast.success(response.data.message);
        getAllUnapprovedPost()
          .then((response) => {
            if (response.data.length > 0) {
              setBlogs(response.data);
            } else {
              setBlogs(null);
            }
          })
          .catch((error) => {
            setBlogs(null);
            toast.error(error.message);
          });
      })
      .catch((error) => {
        setBlogs(null);
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
      });
  };

  useEffect(() => {
    document.title = "Blog Portal | Unreviewed Blog";
  }, []);

  useEffect(() => {
    getAllUnapprovedPost()
      .then((response) => {
        if (response.data.length > 0) {
          setBlogs(response.data);
        } else {
          setBlogs(null);
        }
      })
      .catch((error) => {
        setBlogs(null);
        toast.error(error.message);
      });
  }, []);

  return (
    <div className="parent_div">
      <Navbar />
      <div className="sidebar_content">
        <Sidebar admin="true" />
        <div className="page_content">
          {blogs === null ? (
            <h1 className="result_not_found">No result found</h1>
          ) : (
            blogs.map((blog) => (
              <div className="singleBlog" key={blog.postId}>
                <div className="displayflex">
                  <div className="postByDiv">
                    <div className="profilePicture" />
                    <div className="postBy">
                      <span className="postByName">
                        {blog.firstName + " " + blog.lastName}
                      </span>
                      <span className="postByDesignation">
                        {blog.designation}
                      </span>
                    </div>
                  </div>
                  <div className="date">
                    <span className="date_lable">Updated Date: </span>
                    <span>{blog.updatedAt}</span>
                  </div>
                </div>
                <div className="card_technology">
                  <p className="technology_lable">{blog.technology}</p>
                </div>
                <p className="card_heading">{blog.heading}</p>
                <p
                  className="card_content"
                  dangerouslySetInnerHTML={{ __html: blog.paragraph }}
                />
                <div className="action_buttons">
                  <Button
                    heading="Approve"
                    styling="button"
                    onClick={() => handleStatusClick(blog.postId, "APPROVED")}
                  />
                  <Button
                    heading="Reject"
                    styling="button"
                    onClick={() => handleStatusClick(blog.postId, "REJECTED")}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UnreviewedBlogs;
