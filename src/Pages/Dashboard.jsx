import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Popup from "../Components/Popup";
import Comment from "../Components/Comment";
import { toast } from "react-toastify";
import { TbFlag3, TbFlag3Filled } from "react-icons/tb";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { getAllBlogsService } from "../Service/PostService";
import { addReportService } from "../Service/ReportService";
import { addReactionService } from "../Service/ReactionService";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [blogs, setBlogs] = useState([]);
  const [heading, setHeading] = useState("");
  const [technology, setTechnology] = useState("All");
  const [currentBlogId, setCurrentBlogId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    document.title = "Blog Portal | Dashboard";
  }, []);

  const handleReactionClick = (reaction, blogId) => {
    const data = {
      postId: blogId,
      userId: user.userId,
      currentReaction: reaction,
    };

    addReactionService(data)
      .then(() => {
        getAllBlogsService({
          userId: user.userId,
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

  const handleReportClick = useCallback(
    (blogId, reported) => {
      const data = {
        postId: blogId,
        userId: user.userId,
      };

      addReportService(data)
        .then((response) => {
          if (!reported) {
            toast.success(response.data.message);
          }
          getAllBlogsService({
            userId: user.userId,
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
    },
    [user?.userId, technology, heading]
  );

  useEffect(() => {
    if (isDeleted) {
      setIsDeleted(false);
      handleReportClick(currentBlogId, false);
    }
  }, [isDeleted, currentBlogId, handleReportClick]);

  useEffect(() => {
    const data = {
      userId: user?.userId,
      technology: technology === "All" ? null : technology,
      heading: heading === "" ? null : heading,
    };

    getAllBlogsService(data)
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
  }, [heading, technology, user?.userId]);

  return (
    <div className="parent_div">
      <Navbar
        heading="true"
        technology="true"
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
                  <div className="date">
                    <span className="date_lable">Updated Date: </span>
                    <span>{blog.userPostOutDTO.updatedAt}</span>
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
                    {blog.myPost === true ? null : blog.report !== true ? (
                      <>
                        <div
                          className="displayflex_pointer"
                          onClick={() => {
                            setShowPopup(true);
                            setCurrentBlogId(blog.userPostOutDTO.postId);
                          }}
                        >
                          <TbFlag3 className="employeeCard_reaction report" />
                          <span className="employeeCard_reactionName">
                            Report
                          </span>
                        </div>
                        {showPopup && (
                          <Popup
                            closePopup={closePopup}
                            setIsDeleted={setIsDeleted}
                            heading="Are you sure?"
                            button1="Report"
                            button2="Cancel"
                          />
                        )}
                      </>
                    ) : (
                      <div
                        className="displayflex_pointer"
                        onClick={() => {
                          handleReportClick(blog.userPostOutDTO.postId, true);
                          setIsDeleted(false);
                        }}
                      >
                        <TbFlag3Filled className="employeeCard_reaction report" />
                        <span className="employeeCard_reactionName">
                          Report
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

export default Dashboard;
