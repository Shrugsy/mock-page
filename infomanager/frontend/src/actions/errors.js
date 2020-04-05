import { CREATE_ERROR } from "./index";

export const createError = (msg = "", status = "") => (dispatch) => {
  dispatch({ type: CREATE_ERROR, payload: { msg, status } });
};
