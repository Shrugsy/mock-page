import {
  ADD_PERSON_SUCCESS,
  CLEAR_ADD_PERSON_SUCCESS,
  CREATE_ERROR,
  CREATE_MESSAGE,
} from "../actions";

const initialState = {
  addPersonSuccess: false,
  error: { msg: "", status: null },
  message: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PERSON_SUCCESS:
      return { ...state, addPersonSuccess: true };
    case CLEAR_ADD_PERSON_SUCCESS:
      return { ...state, addPersonSuccess: false };
    case CREATE_ERROR:
      return {
        ...state,
        error: payload,
      };
    case CREATE_MESSAGE:
      return { ...state, message: payload };
    default:
      return state;
  }
};
