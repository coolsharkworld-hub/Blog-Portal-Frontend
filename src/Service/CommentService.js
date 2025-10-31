import { getMapping, postMapping } from "./helper";

export const getCommentService = (postId) => {
  return getMapping(`/comment/${postId}`);
};

export const addCommentService = (data) => {
  return postMapping(`/comment/`, data);
};
