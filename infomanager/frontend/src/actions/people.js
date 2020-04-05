import { GET_PEOPLE, ADD_PERSON, ADD_PERSON_SUCCESS, CLEAR_ADD_PERSON_SUCCESS, CREATE_ERROR, CREATE_MESSAGE} from "./index";
import axios from "axios";

// GET_PEOPLE
export const getPeople = () => (dispatch) => {
  axios
    .get("/api/people/")
    .then((res) => {
      dispatch({ type: GET_PEOPLE, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: CREATE_ERROR, payload: err });
    });
};

// ADD_PERSON
export const addPerson = (person) => (dispatch) => {
  axios.post("/api/people/", person).then((res) => {
    dispatch({ type: ADD_PERSON, payload: res.data });
    dispatch({ type: CREATE_MESSAGE, payload: 'Person added'})
    dispatch({ type: ADD_PERSON_SUCCESS, payload: true})
  })
  .catch((err) => {
    console.log(err);
    dispatch({ type: CREATE_ERROR, payload: err });
  });
};

export const clearAddPersonSuccess = () => (dispatch) => {
  dispatch({type: CLEAR_ADD_PERSON_SUCCESS, payload: false})
}
