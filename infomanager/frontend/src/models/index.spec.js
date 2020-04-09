import { orm } from "./index";
import * as types from "../actions/types";
import { applyActionToModelReducer } from "../testUtils";

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

describe("Models", () => {
  let state;
  let ormState;
  let session;

  beforeEach(() => {
    ormState = orm.getEmptyState();
    session = orm.mutableSession(ormState);
    state = {
      orm: ormState,
    };
  });

  it("correctly handles ADD_PERSON", () => {
    const createAction = {
      type: types.ADD_PERSON,
      payload: peopleData[0],
    };

    expect(session.Person.count()).toBe(0);
    applyActionToModelReducer("Person", createAction, session);
    expect(session.Person.count()).toBe(1);
    const person = session.Person.withId(peopleData[0].id);
    // alternatively could have used:
    // session.Person.first()
    expect(person.ref).toEqual(peopleData[0]);
  });

  it("correctly handles DELETE_PERSON", () => {
    const deleteAction = {
      type: types.DELETE_PERSON,
      payload: peopleData[0].id,
    };
    expect(session.Person.count()).toBe(0);
    peopleData.forEach((person) => session.Person.create(person));
    expect(session.Person.count()).toBe(peopleData.length);
    applyActionToModelReducer("Person", deleteAction, session);
    expect(session.Person.count()).toBe(peopleData.length - 1);
  });
});
