import { getMapping, postMapping, putMapping, deleteMapping } from "./helper";

export const getAllUnapprovedPost = () => {
  return getMapping(`/post/unapprove`);
};

export const getPostByPostIdService = (postID) => {
  return getMapping(`/post/${postID}`);
};

export const getAllBlogsService = (data) => {
  return postMapping(`/post/approve`, data);
};

export const addPostService = (data) => {
  return postMapping(`/post/add`, data);
};

export const myBlogsService = (data) => {
  return postMapping(`/post/userId`, data);
};

export const postApprovalService = (data) => {
  return putMapping(`/post/update/status/`, data);
};

export const updatePostService = (data) => {
  return putMapping(`/post/update`, data);
};

export const deleteUnapprovedPostService = (postId) => {
  return deleteMapping(`/post/delete/${postId}`);
};
