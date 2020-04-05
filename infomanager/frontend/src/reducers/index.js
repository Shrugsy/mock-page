import { GET_PEOPLE, ADD_PERSON } from '../actions'

const initialState = {
  people: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PEOPLE:
      return { ...state, people: payload };
    case ADD_PERSON:
      return { ...state, people: [...state.people, payload] };

    default:
      return state;
  }
};
