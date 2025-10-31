import React, { useEffect } from "react";
import "../Assets/Style/Pages/ReportedBlog.css";
import Button from "../Components/Button.jsx";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Popup from "../Components/Popup";
import { TbFlag3Filled } from "react-icons/tb";
import { toast } from "react-toastify";
import { useState } from "react";
import { deleteUnapprovedPostService } from "../Service/PostService";
import {
  getReportedPostService,
  deleteReportService,
} from "../Service/ReportService";

const ReportedBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentBlogId, setCurrentBlogId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    document.title = "Blog Portal | Reported Blogs";
  }, []);

  useEffect(() => {
    if (isDeleted) {
      handleDeleteClick(currentBlogId);
    }
  }, [isDeleted, currentBlogId]);

  const handleDeleteClick = (blogId) => {
    setIsDeleted(false);
    deleteUnapprovedPostService(blogId)
      .then((response) => {
        toast.success(response.data.message);
        getReportedPostService()
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

  const handleIgnoreClick = (blogId) => {
    deleteReportService(blogId)
      .then((response) => {
        toast.success(response.data.message);
        getReportedPostService()
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
    getReportedPostService()
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
              <div className="singleBlog" key={blog.userPostOutDTO.postId}>
                <div className="single_blog_heading">
                  <div className="displayflex">
                    <div className="postByDiv">
                      <div className="profilePicture" />
                      <div className="postBy">
                        <span className="postByName">
                          {blog.userPostOutDTO.firstName +
                            " " +
                            blog.userPostOutDTO.lastName}
                        </span>
                        <span className="postByDesignation">
                          {blog.userPostOutDTO.designation}
                        </span>
                      </div>
                    </div>
                    <div className="date">
                      <span className="date_lable">Updated Date: </span>
                      <span>{blog.userPostOutDTO.updatedAt}</span>
                    </div>
                  </div>
                </div>
                <div className="card_technology">
                  <p className="technology_lable">
                    {blog.userPostOutDTO.technology}
                  </p>
                </div>
                <p className="card_heading">{blog.userPostOutDTO.heading}</p>
                <p
                  className="card_content"
                  dangerouslySetInnerHTML={{
                    __html: blog.userPostOutDTO.paragraph,
                  }}
                />
                <div className="reportedBlog_flagName">
                  <div className="reportedBlog_report">
                    <TbFlag3Filled />
                  </div>
                  <span className="reportedBlog_reactionName">
                    Report({blog.reportCount})
                  </span>
                </div>
                <br />
                <div className="action_buttons">
                  <Button
                    heading="Ignore"
                    styling="button"
                    onClick={() =>
                      handleIgnoreClick(blog.userPostOutDTO.postId)
                    }
                  />
                  <Button
                    heading="Delete"
                    styling="button"
                    onClick={() => {
                      setShowPopup(true);
                      setCurrentBlogId(blog.userPostOutDTO.postId);
                    }}
                  />
                  {showPopup && (
                    <Popup
                      closePopup={closePopup}
                      setIsDeleted={setIsDeleted}
                      heading="Are you sure?"
                      paragraph="You won't be able to revert this!"
                      button1="Delete"
                      button2="Cancel"
                    />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportedBlogs;
