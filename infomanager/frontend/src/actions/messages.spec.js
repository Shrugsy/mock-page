import * as actions from "./messages";
import * as types from "./types";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = { message: "" };
const store = mockStore(initialState);

describe("messages actions", () => {
  afterEach(() => {
    store.clearActions();
  });
  it("should dispatch an action to create a message", () => {
    const msg = "this is a message";
    const expectedActions = [
      {
        type: types.CREATE_MESSAGE,
        payload: msg,
      },
    ];

    store.dispatch(actions.createMessage(msg));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should dispatch an action for an empty message when called without arguments", () => {
    const expectedActions = [
      {
        type: types.CREATE_MESSAGE,
        payload: "",
      },
    ];

    store.dispatch(actions.createMessage());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
