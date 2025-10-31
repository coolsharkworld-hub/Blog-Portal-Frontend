import React from "react";
import { IoMdSend } from "react-icons/io";
import { toast } from "react-toastify";
import { FaUserAlt } from "react-icons/fa";
import {
  addCommentService,
  getCommentService,
} from "../Service/CommentService";
import { useState } from "react";

const CommentComponent = (props) => {
  const [visible, setIsVisible] = useState(false);
  const [comments, setComments] = useState(null);
  const [addComment, setAddComment] = useState("");
  const handleCommentClick = (userId, blogId) => {
    const data = {
      message: addComment,
      userId: userId,
      postId: blogId,
    };
    addCommentService(data)
      .then((response) => {
        toast.success(response.data.message);
        setAddComment("");
        getCommentService(blogId)
          .then((response) => {
            setComments(response.data);
          })
          .catch((error) => {
            setComments(null);
            if (error.response) {
              toast.error(error.response.data.message);
            } else {
              toast.error(error.message);
            }
          });
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.message);
        } else {
          toast.error(error.message);
        }
      });
  };

  const toggleCommentVisibility = (blogId) => {
    if (visible === false) {
      getCommentService(blogId)
        .then((response) => {
          visible === true ? setIsVisible(false) : setIsVisible(true);
          setComments(response.data);
        })
        .catch((error) => {
          setComments(null);
          if (error.response) {
            toast.error(error.response.data.message);
          } else {
            toast.error(error.message);
          }
        });
    } else {
      visible === true ? setIsVisible(false) : setIsVisible(true);
    }
  };

  return (
    <div>
      <div className=" comment_component">
        <input
          type="text"
          className="comment_input"
          placeholder="Comments here..."
          onChange={(e) => setAddComment(e.target.value)}
          value={addComment}
        />
        {addComment.trim() !== "" && (
          <div className="comment_icon">
            <IoMdSend
              onClick={() => {
                handleCommentClick(props.userId, props.blogId);
              }}
            />
          </div>
        )}
      </div>
      <div className="displayflex">
        <h4>
          Comments({comments === null ? props.commentCount : comments?.length})
        </h4>
        {props.commentCount > 0 || comments?.length > 0 ? (
          visible === false ? (
            <span
              className=" toggle_comment"
              onClick={() => toggleCommentVisibility(props.blogId)}
            >
              Show
            </span>
          ) : (
            <span
              className=" toggle_comment"
              onClick={() => toggleCommentVisibility(props.blogId)}
            >
              Hide
            </span>
          )
        ) : (
          ""
        )}
      </div>
      {visible === true &&
        comments?.length > 0 &&
        comments?.map((comment) => (
          <div key={comment.id} className="comment_body">
            <FaUserAlt className="comment_user_icon" />
            <b className="comment_user_name">
              {comment?.firstName} {comment?.lastName}
            </b>
            <p className="comment_content">{comment.body}</p>
          </div>
        ))}
    </div>
  );
};

export default CommentComponent;
