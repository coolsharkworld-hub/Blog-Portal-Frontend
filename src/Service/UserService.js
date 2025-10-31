import { postMapping } from "./helper";

export const signUpService = (data) => {
  return postMapping(`/user/register`, data);
};

export const loginService = (data) => {
  return postMapping(`/user/login`, data);
};
