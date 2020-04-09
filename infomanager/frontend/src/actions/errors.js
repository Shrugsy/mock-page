import { CREATE_ERROR } from "./types";

export const createError = (msg = "", status = "") => (dispatch) => {
  dispatch({ type: CREATE_ERROR, payload: { msg, status } });
};
