import { Model, attr, ORM} from "redux-orm";
import { ADD_PERSON, DELETE_PERSON } from "../actions/types";

export class Person extends Model {
  static get fields() {
    return {
      id: attr(),
      firstname: attr(),
      lastname: attr(),
      email: attr(),
      age: attr(),
      income: attr(),
    };
  }

  static reducer({type, payload}, Person, session) {
    let person;
    switch ( type ) {
      case ADD_PERSON: {
        // payload here is expected to be the whole person object
        Person.create(payload);
        break;
      }
      case DELETE_PERSON: {
        // payload here is expected to be the id
        person = Person.withId(payload)
        person.delete()
        break;
      }
      default:
        break;
    }
  }
}
Person.modelName = 'Person'

export const orm = new ORM({
  stateSelector: state => state.orm
})
orm.register(Person)
