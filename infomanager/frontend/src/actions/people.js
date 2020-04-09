import {
  ADD_PERSON,
  ADD_PERSON_SUCCESS,
  DELETE_PERSON,
  CLEAR_ADD_PERSON_SUCCESS,
} from "./types";
import axios from "axios";
import { createError } from "./errors";
import { createMessage } from "./messages";

// INITIALIZE ALL PEOPLE FROM DB
export const initializePeople = () => (dispatch) => {
  return axios
    .get("/api/people/")
    .then((res) => {
      // This doesn't currently, but should potentially clear all 'Person's from the state first
      // It is currently only expected to be called on load so does not currently need to
      res.data.forEach((person) => {
        dispatch({ type: ADD_PERSON, payload: person });
      });
    })
    .catch((err) => {
      // console.log(err);
      dispatch(createError(err.response.data, err.response.status));
    });
};

// ADD_PERSON
export const addPerson = (person) => (dispatch) => {
  return axios
    .post("/api/people/", person)
    .then((res) => {
      dispatch({ type: ADD_PERSON, payload: res.data });
      dispatch(createMessage("Person added"));
      dispatch({ type: ADD_PERSON_SUCCESS, payload: true });
    })
    .catch((err) => {
      // console.log(err);
      dispatch(createError(err.response.data, err.response.status));
    });
};

// CLEAR_ADD_PERSON_SUCCESS
export const clearAddPersonSuccess = () => (dispatch) => {
  return dispatch({ type: CLEAR_ADD_PERSON_SUCCESS, payload: false });
};

// DELETE_PERSON
export const deletePerson = (id) => (dispatch) => {
  return axios
    .delete(`/api/people/${id}/`)
    .then((res) => {
      dispatch({ type: DELETE_PERSON, payload: id });
      dispatch(createMessage("Person deleted"));
    })
    .catch((err) => {
      dispatch(createError(err.response.data, err.response.status));
    });
};
