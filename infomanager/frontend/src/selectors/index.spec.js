import { peopleSelector } from "./index.js";

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

describe("Selectors", () => {
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
  });

  it("peopleSelector selects all people from state", () => {
    const results = peopleSelector(state);
    expect(results).toEqual(peopleData);
  });
});
