import React, { useEffect, useState } from "react";
import "../Assets/Style/Pages/MyBlogs.css";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Button from "../Components/Button.jsx";
import Comment from "../Components/Comment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { myBlogsService } from "../Service/PostService";
import { addReactionService } from "../Service/ReactionService";

const MyBlogs = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [heading, setHeading] = useState("");
  const [status, setStatus] = useState("All");
  const [technology, setTechnology] = useState("All");

  const handleReactionClick = (reaction, blogId) => {
    const data = {
      postId: blogId,
      userId: user.userId,
      currentReaction: reaction,
    };

    addReactionService(data)
      .then(() => {
        myBlogsService({
          userId: user.userId,
          status: status === "All" ? null : status,
          technology: technology === "All" ? null : technology,
          heading: heading === "" ? null : heading,
        })
          .then((response) => {
            if (response.data.length > 0) {
              setBlogs(response.data);
            } else {
              setBlogs(null);
            }
          })
          .catch((error) => {
            setBlogs(null);
            if (error.response) {
              toast.error(error.response.data.message);
            } else {
              toast.error(error.message);
            }
          });
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
      });
  };

  useEffect(() => {
    document.title = "Blog Portal | My Blogs";
  }, []);

  useEffect(() => {
    const data = {
      userId: user?.userId,
      status: status === "All" ? null : status,
      technology: technology === "All" ? null : technology,
      heading: heading === "" ? null : heading,
    };

    myBlogsService(data)
      .then((response) => {
        if (response.data.length > 0) {
          setBlogs(response.data);
        } else {
          setBlogs(null);
        }
      })
      .catch((error) => {
        setBlogs(null);
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
      });
  }, [navigate, status, heading, technology, user?.userId]);

  return (
    <div className="parent_div">
      <Navbar
        heading="true"
        technology="true"
        status="true"
        onChange={(e) => setStatus(e.target.value)}
        value={status}
        onChangeHeading={(e) => setHeading(e)}
        onChangeTechnology={(e) => setTechnology(e.target.value)}
        valueTechnology={technology}
      />
      <div className="sidebar_content">
        <Sidebar />
        <div className="page_content">
          {blogs === null ? (
            <h1 className="result_not_found">No result found</h1>
          ) : (
            blogs.map((blog) => (
              <div className="singleBlog" key={blog.userPostOutDTO.postId}>
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
                  <div className="myblogs_editbutton">
                    {blog.status === "APPROVED" ? (
                      <button className="myblog_approvalButton approved">
                        {blog.status}
                      </button>
                    ) : blog.status === "PENDING" ? (
                      <button className="myblog_approvalButton pending">
                        {blog.status}
                      </button>
                    ) : (
                      <button className="myblog_approvalButton rejected">
                        {blog.status}
                      </button>
                    )}
                    <Button
                      heading="Edit"
                      styling="myblog_editButtton"
                      onClick={() =>
                        navigate(`/updateblog/${blog.userPostOutDTO.postId}`)
                      }
                    />
                  </div>
                </div>
                <div className="displayflex">
                  <div className="card_technology">
                    <p className="technology_lable">
                      {blog.userPostOutDTO.technology}
                    </p>
                  </div>
                  <div className="date">
                    <span className="date_lable">Updated Date: </span>
                    <span>{blog.userPostOutDTO.updatedAt}</span>
                  </div>
                </div>
                <p className="card_heading">{blog.userPostOutDTO.heading}</p>
                <p
                  className="card_content"
                  dangerouslySetInnerHTML={{
                    __html: blog.userPostOutDTO.paragraph,
                  }}
                />
                <div className="blog_activities">
                  <div className="employeeCard_reactions">
                    {blog.like !== true ? (
                      <div
                        className="displayflex_pointer"
                        onClick={() => {
                          handleReactionClick(true, blog.userPostOutDTO.postId);
                        }}
                      >
                        <BiLike className="employeeCard_reaction like" />
                        <span className="employeeCard_reactionName">
                          Like({blog.likeCount})
                        </span>
                      </div>
                    ) : (
                      <div
                        className="displayflex_pointer"
                        onClick={() => {
                          handleReactionClick(true, blog.userPostOutDTO.postId);
                        }}
                      >
                        <BiSolidLike className="employeeCard_reaction like" />
                        <span className="employeeCard_reactionName">
                          Like({blog.likeCount})
                        </span>
                      </div>
                    )}
                    {blog.dislike !== true ? (
                      <div
                        className="displayflex_pointer"
                        onClick={() => {
                          handleReactionClick(
                            false,
                            blog.userPostOutDTO.postId
                          );
                        }}
                      >
                        <BiDislike className="employeeCard_reaction dislike" />
                        <span className="employeeCard_reactionName">
                          Dislike({blog.dislikeCount})
                        </span>
                      </div>
                    ) : (
                      <div
                        className="displayflex_pointer"
                        onClick={() => {
                          handleReactionClick(
                            false,
                            blog.userPostOutDTO.postId
                          );
                        }}
                      >
                        <BiSolidDislike className="employeeCard_reaction dislike" />
                        <span className="employeeCard_reactionName">
                          Dislike({blog.dislikeCount})
                        </span>
                      </div>
                    )}
                  </div>
                  <Comment
                    userId={user.userId}
                    blogId={blog.userPostOutDTO.postId}
                    commentCount={blog.commentCount}
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

export default MyBlogs;
