import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Table } from "semantic-ui-react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import PersonTableRow from "./PersonTableRow";
import * as types from '../actions/types'
import { timeout } from "../helpers/testUtils";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let wrapper, store, mock;
mock = new MockAdapter(axios);
store = mockStore({});

const props = {
  id: 1,
  firstname: "john",
  lastname: "smith",
  email: "john@email.com",
  age: 22,
  income: 65000,
};

/*eslint-disable no-undef*/
describe("PersonTableRow", () => {
  beforeAll(() => {
    wrapper = mount(
      <Provider store={store}>
        <Table>
          <Table.Body>
            <PersonTableRow {...props} />
          </Table.Body>
        </Table>
      </Provider>
    );
  });
  afterAll(() => {
    store.clearActions();
    mock.restore();
  });

  it("should render a table row with cells equal to the props", () => {
    expect(wrapper.find("td").length).toBe(Object.keys(props).length - 2);
    // -2 because we don't show id, and firstname + lastname merge to one cell
  });

  it("should show a delete button when the row is moused over", () => {
    wrapper.find("tr").simulate("mouseleave");
    expect(wrapper.find("button").length).toBe(0);
    wrapper.find("tr").simulate("mouseenter");
    expect(wrapper.find("button").length).toBe(1);
  });

  it("should dispatch a DELETE_PERSON action when the button is clicked", async () => {
    const successStatus = 204;
    const personId = props.id;
    mock.onDelete(`/api/people/${personId}/`).reply(successStatus);
    expect(store.getActions().length).toBe(0);
    wrapper.find("tr").simulate("mouseenter");
    wrapper.find("button").prop("onClick")();
    await timeout(500); //hacky solution: give time for the click event to register etc.
    // NOTE:
    // preferable way would be to have a spy for the 'deletePerson' function
    // and check 'toHaveBeenCalled' on it,
    // however I have not been able to get the spy working on exported functions
    expect(store.getActions().length).toBeGreaterThan(0);
    const expectedAction = {
      type: types.DELETE_PERSON,
      payload: props.id,
    };
    expect(store.getActions()[0]).toEqual(expectedAction);
  });
});
/*eslint-disable no-undef*/
