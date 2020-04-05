import { GET_PEOPLE, ADD_PERSON, ERROR } from "./index";
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
      dispatch({ type: ERROR, payload: err });
    });
};

// ADD_PERSON
export const addPerson = () => (dispatch) => {
  axios.post("/api/people/").then((res) => {
    dispatch({ type: ADD_PERSON, payload: res.data });
  })
  .catch((err) => {
    console.log(err);
    dispatch({ type: ERROR, payload: err });
  });
};
