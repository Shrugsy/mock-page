import React from "react";
import Alerts from "./Alerts";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as types from "../actions/types";
import { initialState } from "../reducers";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

describe("Alerts", () => {
  it("should not dispatch anything when state.info.error.msg & state.info.message are falsy", () => {
    const fullState = {
      info: initialState,
    };

    const middleware = [thunk];
    const mockStore = configureMockStore(middleware);
    const store = mockStore(fullState);
    const wrapper = mount(
      <Provider store={store}>
        <AlertProvider template={AlertTemplate}>
          <Alerts />
        </AlertProvider>
      </Provider>
    );

    expect(store.getActions().length).toBe(0);
  });

  it("when state.info.error.msg is truthy, should alert an error, then dispatch a blank error ", () => {
    const fullState = {
      info: { ...initialState, error: { msg: "some error", status: "404" } },
    };
    const middleware = [thunk];
    const mockStore = configureMockStore(middleware);
    const expectedAction = {
      type: types.CREATE_ERROR,
      payload: { msg: "", status: "" },
    };
    const store = mockStore(fullState);
    const wrapper = mount(
      <Provider store={store}>
        <AlertProvider template={AlertTemplate}>
          <Alerts />
        </AlertProvider>
      </Provider>
    );

    // TODO: when determined as possible, should have a spy on alert.error
    expect(store.getActions().length).toBe(1);
    expect(store.getActions()[0]).toEqual(expectedAction);
  });

  it("when state.message is truthy, should dispatch a blank message .", () => {
    const fullState = {
      info: { ...initialState, message: "some message" },
    };
    const middleware = [thunk];
    const mockStore = configureMockStore(middleware);
    const expectedAction = {
      type: types.CREATE_MESSAGE,
      payload: "",
    };

    const store = mockStore(fullState);
    const wrapper = mount(
      <Provider store={store}>
        <AlertProvider template={AlertTemplate}>
          <Alerts />
        </AlertProvider>
      </Provider>
    );

    expect(store.getActions().length).toBe(1);
    expect(store.getActions()[0]).toEqual(expectedAction);
  });
});
