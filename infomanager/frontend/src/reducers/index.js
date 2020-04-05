import {
  GET_PEOPLE,
  ADD_PERSON,
  ADD_PERSON_SUCCESS,
  DELETE_PERSON,
  CLEAR_ADD_PERSON_SUCCESS,
  CREATE_ERROR,
  CREATE_MESSAGE,
} from "../actions";

const initialState = {
  people: [],
  addPersonSuccess: false,
  error: { msg: "", status: null },
  message: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PEOPLE:
      return { ...state, people: payload };
    case ADD_PERSON:
      return { ...state, people: [...state.people, payload] };
    case ADD_PERSON_SUCCESS:
      return { ...state, addPersonSuccess: true };
    case DELETE_PERSON:
      return {
        ...state,
        people: state.people.filter((person) => person.id !== payload),
      };
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
