import * as actions from "./errors";
import * as types from "./types";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = { error: {} };
const store = mockStore(initialState);

describe("error actions", () => {
  afterEach(() => {
    store.clearActions();
  });

  it("should dispatch an action to create an error", () => {
    const msg = "some error has occurred";
    const status = 520;
    const expectedActions = [
      {
        type: types.CREATE_ERROR,
        payload: {
          msg,
          status,
        },
      },
    ];
    store.dispatch(actions.createError(msg, status));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should dispatch an action for a clear error when called without arguments", () => {
    const expectedActions = [
      {
        type: types.CREATE_ERROR,
        payload: { msg: "", status: "" },
      },
    ];
    store.dispatch(actions.createError());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
