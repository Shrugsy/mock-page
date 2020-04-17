import React from "react";
import PersonTable from "./PersonTable";
import { render, fireEvent, screen } from "@testing-library/react";

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { orm } from "../models/index.js";

const person0 = {
  id: 1,
  firstname: "John",
  lastname: "smith",
  email: "john@email.com",
  age: 32,
  income: 90000,
};
const person1 = {
  id: 2,
  firstname: "Mark",
  lastname: "Markington",
  email: "mark@email.com",
  age: 27,
  income: 75000,
};
const person2 = {
  id: 3,
  firstname: "Jane",
  lastname: "Anderson",
  email: "jane@email.com",
  age: 22,
  income: 60000,
};

let peopleData = [person0, person1, person2];

const mockStore = configureMockStore();
let store, container;

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
    ({ container } = render(
      <Provider store={store}>
        <PersonTable />
      </Provider>
    ));
  });

  it("should get an array of people from the ORM state and map that many instances of 'PersonTableRow'", () => {
    expect(container.querySelector('tbody').children.length).toBe(peopleData.length)
  });

  describe("should sort people when a table header is clicked", () => {
    it("should sort by name when corresponding header is clicked, and when clicked thrice", () => {
      fireEvent.click(container.querySelector("#name-header"));
      expect(container.querySelectorAll("td")[0].textContent).toBe(
        "Jane Anderson"
      );
      expect(container.querySelectorAll("td")[1].textContent).toBe(
        "22"
      );
      fireEvent.click(container.querySelector("#name-header"));
      fireEvent.click(container.querySelector("#name-header"));
      expect(container.querySelectorAll("td")[0].textContent).toBe(
        "Jane Anderson"
      );
      expect(container.querySelectorAll("td")[1].textContent).toBe(
        "22"
      );

    });
    it("should reverse sort by name when corresponding header is clicked twice", () => {
      fireEvent.click(container.querySelector("#name-header"));
      fireEvent.click(container.querySelector("#name-header"));
      expect(container.querySelectorAll("td")[0].textContent).toBe(
        "Mark Markington"
      );
    });

    it("should sort by age when corresponding header is clicked", () => {
      fireEvent.click(container.querySelector('#age-header'));
      expect(container.querySelectorAll("td")[0].textContent).toBe(
        "Jane Anderson"
      );
      expect(container.querySelectorAll("td")[1].textContent).toBe(
        "22"
      );
    })
    it("should reverse sort by age when corresponding header is clicked twice", () => {
      fireEvent.click(container.querySelector("#age-header"));
      fireEvent.click(container.querySelector("#age-header"));
      expect(container.querySelectorAll("td")[0].textContent).toBe(
        "John Smith"
      );
      expect(container.querySelectorAll("td")[1].textContent).toBe(
        "32"
      );
    })

    
    it("should sort by email when corresponding header is clicked", () => {
      fireEvent.click(container.querySelector('#email-header'));
      expect(container.querySelectorAll("td")[0].textContent).toBe(
        "Jane Anderson"
      );
      expect(container.querySelectorAll("td")[1].textContent).toBe(
        "22"
      );
    })
    it("should reverse sort by email when corresponding header is clicked twice", () => {
      fireEvent.click(container.querySelector("#email-header"));
      fireEvent.click(container.querySelector("#email-header"));
      expect(container.querySelectorAll("td")[0].textContent).toBe(
        "Mark Markington"
      );
      expect(container.querySelectorAll("td")[1].textContent).toBe(
        "27"
      );
    })

    
    it("should sort by income when corresponding header is clicked", () => {
      fireEvent.click(container.querySelector('#income-header'));
      expect(container.querySelectorAll("td")[0].textContent).toBe(
        "Jane Anderson"
      );
      expect(container.querySelectorAll("td")[1].textContent).toBe(
        "22"
      );
    })
    it("should reverse sort by income when corresponding header is clicked twice", () => {
      fireEvent.click(container.querySelector("#income-header"));
      fireEvent.click(container.querySelector("#income-header"));
      expect(container.querySelectorAll("td")[0].textContent).toBe(
        "John Smith"
      );
      expect(container.querySelectorAll("td")[1].textContent).toBe(
        "32"
      );
    })

  });
});
