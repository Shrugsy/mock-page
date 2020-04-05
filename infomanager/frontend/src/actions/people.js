import { GET_PEOPLE, ADD_PERSON, ADD_PERSON_SUCCESS, DELETE_PERSON, CLEAR_ADD_PERSON_SUCCESS, CREATE_ERROR, CREATE_MESSAGE} from "./index";
import axios from "axios";

// GET_PEOPLE
export const getPeople = () => (dispatch) => {
  axios
    .get("/api/people/")
    .then((res) => {
      dispatch({ type: GET_PEOPLE, payload: res.data });
    })
    .catch((err) => {
      // console.log(err);
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
    // console.log(err);
    dispatch({ type: CREATE_ERROR, payload: err });
  });
};

// CLEAR_ADD_PERSON_SUCCESS
export const clearAddPersonSuccess = () => (dispatch) => {
  dispatch({type: CLEAR_ADD_PERSON_SUCCESS, payload: false})
}

// DELETE_PERSON
export const deletePerson = (id) => (dispatch) => {
  axios.delete(`/api/people/${id}/`)
  .then((res) => {
    dispatch({ type: DELETE_PERSON, payload: id});
    dispatch({ type: CREATE_MESSAGE, payload: 'Person deleted'})
  })
  .catch((err) => {
    // console.log(err);
    dispatch({ type: CREATE_ERROR, payload: err });
  })
}
