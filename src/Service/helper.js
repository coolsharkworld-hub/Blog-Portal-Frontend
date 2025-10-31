import axios from "axios";

const baseUrl = process.env.REACT_APP_HOST || "http://localhost";
const port = process.env.REACT_APP_PORT || "8080";

const constructFullUrl = (url) => `${baseUrl}:${port}${url}`;

export const getMapping = (url) => {
  return axios.get(constructFullUrl(url));
};

export const putMapping = (url, data) => {
  return axios.put(constructFullUrl(url), data);
};

export const postMapping = (url, data) => {
  return axios.post(constructFullUrl(url), data);
};

export const deleteMapping = (url) => {
  return axios.delete(constructFullUrl(url));
};
