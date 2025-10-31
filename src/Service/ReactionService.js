import { putMapping } from "./helper";

export const addReactionService = (data) => {
  return putMapping(`/reaction/`, data);
};
