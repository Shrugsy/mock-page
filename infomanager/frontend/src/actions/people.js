import {
  GET_PEOPLE,
  ADD_PERSON,
  ADD_PERSON_SUCCESS,
  DELETE_PERSON,
  CLEAR_ADD_PERSON_SUCCESS,
} from "./index";
import axios from "axios";
import { createError } from "./errors";
import { createMessage } from "./messages";

// GET_PEOPLE
export const getPeople = () => (dispatch) => {
  axios
    .get("/api/people/")
    .then((res) => {
      dispatch({ type: GET_PEOPLE, payload: res.data });
    })
    .catch((err) => {
      // console.log(err);
      dispatch(createError(err.response.data, err.response.status));
    });
};

// ADD_PERSON
export const addPerson = (person) => (dispatch) => {
  axios
    .post("/api/people/", person)
    .then((res) => {
      dispatch({ type: ADD_PERSON, payload: res.data });
      dispatch(createMessage("Person added"));
      dispatch({ type: ADD_PERSON_SUCCESS, payload: true });
    })
    .catch((err) => {
      dispatch(createError(err.response.data, err.response.status));
    });
};

// CLEAR_ADD_PERSON_SUCCESS
export const clearAddPersonSuccess = () => (dispatch) => {
  dispatch({ type: CLEAR_ADD_PERSON_SUCCESS, payload: false });
};

// DELETE_PERSON
export const deletePerson = (id) => (dispatch) => {
  axios
    .delete(`/api/people/${id}/`)
    .then((res) => {
      dispatch({ type: DELETE_PERSON, payload: id });
      dispatch(createMessage("Person deleted"));
    })
    .catch((err) => {
      // console.log(err);
      dispatch(createError(err.response.data, err.response.status));
    });
};
