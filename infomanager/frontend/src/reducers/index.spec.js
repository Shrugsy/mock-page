import * as reducers from "./index.js";
import * as types from "../actions/types";

const initialState = reducers.initialState;
const initialStateCopy = { ...initialState };

describe("redux reducers", () => {
  it(", when type === ADD_PERSON_SUCCESS, should return a copy of initialState with 'addPersonSuccess' === true", () => {
    const result = reducers.default(initialState, {
      type: types.ADD_PERSON_SUCCESS,
      payload: null,
    });
    expect(result).toEqual({ ...initialState, addPersonSuccess: true });
    // Also check that the initialState itself was not modified
    expect(initialStateCopy).toEqual(initialState);
  });

  it(", when type === CLEAR_ADD_PERSON_SUCCESS, should return a copy of initialState with 'addPersonSuccess' === false", () => {
    const result = reducers.default(initialState, {
      type: types.CLEAR_ADD_PERSON_SUCCESS,
      payload: null,
    });
    expect(result).toEqual({ ...initialState, addPersonSuccess: false });
    expect(initialStateCopy).toEqual(initialState);
  });

  it(", when type === CREATE_ERROR, should return a copy of initialState with 'error' === payload", () => {
    const errorPayload = {
      msg: "some error message",
      status: "some error status",
    };
    const result = reducers.default(initialState, {
      type: types.CREATE_ERROR,
      payload: errorPayload,
    });
    expect(result).toEqual({ ...initialState, error: errorPayload });
    expect(initialStateCopy).toEqual(initialState);
  });

  it(", when type === CREATE_MESSAGE, should return a copy of initialState with 'message' === payload", () => {
    const messagePayload = "some message";
    const result = reducers.default(initialState, {
      type: types.CREATE_MESSAGE,
      payload: messagePayload,
    });
    expect(result).toEqual({ ...initialState, message: messagePayload });
    expect(initialStateCopy).toEqual(initialState);
  });
});
