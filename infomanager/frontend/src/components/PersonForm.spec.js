import React from "react";
import { mount } from "../../setupEnzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import PersonForm from "./PersonForm";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { timeout } from "../helpers/testUtils";
import * as types from "../actions/types";

import { initialState } from "../reducers";

const person0 = {
  firstname: "john",
  lastname: "smith",
  email: "john@email.com",
  age: 28,
  income: 80000,
};
const jsonHeader = { "content-type": "application/json" };

describe("PersonForm", () => {
  it("should display a form which dispatches an ADD_PERSON action based on the input", async () => {
    const fullState = {
      info: initialState,
    };
    const middleware = [thunk];
    
    const mockStore = configureMockStore(middleware);
    const store = mockStore(fullState);
    const mock = new MockAdapter(axios);
    store.clearActions();

    const wrapper = mount(
      <Provider store={store}>
        <PersonForm />
      </Provider>
    );
    mock.onPost("/api/people/", person0).reply(201, person0, jsonHeader);

    // simulate entering data into the fields:
    wrapper
      .find("input")
      .find("#input-firstname")
      .simulate("change", { target: { value: person0.firstname } });
    wrapper
      .find("input")
      .find("#input-lastname")
      .simulate("change", { target: { value: person0.lastname } });
    wrapper
      .find("input")
      .find("#input-email")
      .simulate("change", { target: { value: person0.email } });
    wrapper
      .find("input")
      .find("#input-age")
      .simulate("change", { target: { value: person0.age } });
    wrapper
      .find("input")
      .find("#input-income")
      .simulate("change", { target: { value: person0.income } });

    const expectedAction = {
      type: types.ADD_PERSON,
      payload: person0,
    };

    expect(store.getActions().length).toBe(0);
    // simulate submitting the form
    wrapper.find("form").props().onSubmit();

    await timeout(500); //hacky solution: give time for the click event to register etc.
    // expect 'addPerson(person0)' to have been dispatched
    // making do with the action until able to work out spying on an exported function
    expect(store.getActions()[0]).toEqual(expectedAction);
    mock.restore();
    store.clearActions();
  });

  it("should dispatch clearAddPersonSuccess() when addPersonSuccess is truthy", ()=>{
    const fullState = {
      info: {...initialState, addPersonSuccess: true},
    };

    const middleware = [thunk];
    
    const mockStore = configureMockStore(middleware);
    const store = mockStore(fullState);
    const mock = new MockAdapter(axios);
    store.clearActions();

    const wrapper = mount(
      <Provider store={store}>
        <PersonForm />
      </Provider>
    );
    
    const expectedAction = {
      type: types.CLEAR_ADD_PERSON_SUCCESS,
      payload: false,
    };

    expect(store.getActions()[0]).toEqual(expectedAction);
  })
});
