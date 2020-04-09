import * as actions from "./people";
import * as types from "./types";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
  addPersonSuccess: false,
  error: { msg: "", status: null },
  message: "",
};
const store = mockStore(initialState);
const person0 = {
  firstname: "John",
  lastname: "Smith",
  email: "john@email.com",
  age: 32,
  income: 4324243,
};
const person1 = {
  firstname: "jane",
  lastname: "doe",
  email: "jane@doe.com",
  age: 22,
  income: 20800,
};
const invalidPerson0 = {
  firstname: "",
  lastname: "doe",
  email: "jane@doe.com",
  age: 22,
  income: 20800,
};
const jsonHeader = { "content-type": "application/json" };

describe("people actions", () => {
  let mock;
  beforeEach(() => {
    mock = new MockAdapter(axios);
    store.clearActions();
  });
  afterEach(() => {
    store.clearActions();
    mock.restore();
  });

  it("should have an 'initializePeople' function to retrieve people data and dispatch the retrieved data to the store", () => {
    mock.onGet("/api/people/").reply(200, [person0, person1], jsonHeader);

    const expectedActions = [
      { type: types.ADD_PERSON, payload: person0 },
      { type: types.ADD_PERSON, payload: person1 },
    ];

    store.dispatch(actions.initializePeople()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should have an 'initializePeople' function to retrieve people data and on error dispatch an error action to the store", () => {
    const errorStatus = 404;
    const errorMessage = "some kind of error";
    mock.onGet("/api/people/").reply(errorStatus, errorMessage);
    const expectedActions = [
      {
        type: types.CREATE_ERROR,
        payload: { msg: errorMessage, status: errorStatus },
      },
    ];
    store.dispatch(actions.initializePeople()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should have an 'addPerson' function to post a request to the api, and on success dispatch actions to add to store, create a message that they were added, and set the success state to true", () => {
    mock.onPost("/api/people/", person0).reply(201, person0, jsonHeader);

    const expectedActions = [
      { type: types.ADD_PERSON, payload: person0 },
      { type: types.CREATE_MESSAGE, payload: "Person added" },
      { type: types.ADD_PERSON_SUCCESS, payload: true },
    ];

    store.dispatch(actions.addPerson(person0)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should have an 'addPerson' function to post a request to the api, and on error dispatch an error action to the store", () => {
    const errorStatus = 400;
    const errorMessage = { email: ["person with this email already exists"] };
    mock
      .onPost("/api/people/", invalidPerson0)
      .reply(errorStatus, errorMessage);
    const expectedActions = [
      {
        type: types.CREATE_ERROR,
        payload: { msg: errorMessage, status: errorStatus },
      },
    ];
    store.dispatch(actions.addPerson(invalidPerson0)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should have a 'clearAddPersonSuccess' function which sends an action to set state of CLEAR_ADD_PERSON_SUCCESS to false", () => {
    const expectedActions = [
      { type: types.CLEAR_ADD_PERSON_SUCCESS, payload: false },
    ];
    store.dispatch(actions.clearAddPersonSuccess());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should have a 'deletePerson' function to send a delete request to the api, and on success dispatch a DELETE_PERSON action and call createMessage('Person deleted')", () => {
    const successStatus = 204;
    const personId = 555;

    mock.onDelete(`/api/people/${personId}/`).reply(successStatus);
    const expectedActions = [
      { type: types.DELETE_PERSON, payload: personId },
      { type: types.CREATE_MESSAGE, payload: "Person deleted" },
    ];

    store.dispatch(actions.deletePerson(personId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should have a 'deletePerson' function to send a delete request to the api, and on error dispatch an error action to the store", () => {
    const errorStatus = 404;
    const errorMessage = { detail: ["Not found."] };
    const invalidId = 999;
    mock.onDelete(`/api/people/${invalidId}/`).reply(errorStatus, errorMessage);

    const expectedActions = [
      {
        type: types.CREATE_ERROR,
        payload: { msg: errorMessage, status: errorStatus },
      },
    ];

    store.dispatch(actions.deletePerson(invalidId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
