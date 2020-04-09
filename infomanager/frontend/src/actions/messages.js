import { CREATE_MESSAGE } from "./types";

export const createMessage = (msg = "") => (dispatch) => {
  dispatch({ type: CREATE_MESSAGE, payload: msg });
};
