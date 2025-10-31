import { getMapping, putMapping, deleteMapping } from "./helper";

export const addReportService = (data) => {
  return putMapping(`/report/`, data);
};

export const getReportedPostService = () => {
  return getMapping(`/post/reported/`);
};

export const deleteReportService = (postId) => {
  return deleteMapping(`/report/delete/${postId}`);
};
