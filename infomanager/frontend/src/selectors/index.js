import { orm } from '../models'
import { createSelector } from 'redux-orm';

// Selects the state managed by Redux-ORM.
export const peopleSelector = createSelector(orm.Person);