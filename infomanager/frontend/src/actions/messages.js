import { CREATE_MESSAGE } from "./index";

export const createMessage = (msg = "") => (dispatch) => {
  dispatch({ type: CREATE_MESSAGE, payload: msg });
};
