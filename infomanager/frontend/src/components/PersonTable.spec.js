import React from "react";
import PersonTable from "./PersonTable";
import { mount } from "../../setupEnzyme";

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { orm } from "../models/index.js";

let peopleData = [
  {
    id: 1,
    firstname: "John",
    lastname: "smith",
    email: "john@email.com",
    age: 32,
    income: 90000,
  },
  {
    id: 2,
    firstname: "Mark",
    lastname: "Markington",
    email: "mark@email.com",
    age: 27,
    income: 75000,
  },
];

const mockStore = configureMockStore();
let wrapper, store;

describe("PersonTable", () => {
  let state;
  let ormState;
  let session;
  beforeEach(() => {
    ormState = orm.getEmptyState();
    session = orm.mutableSession(ormState);
    peopleData.forEach((person) => session.Person.create(person));
    state = {
        orm: ormState,
      };
      store = mockStore(state);
  });
  it("should get an array of people from the ORM state and map that many instances of 'PersonTableRow'", () => {
    wrapper = mount(
      <Provider store={store}>
        <PersonTable />
      </Provider>
    );
    expect(wrapper.find('PersonTableRow').length).toBe(peopleData.length)
  });
});
