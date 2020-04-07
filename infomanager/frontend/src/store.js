import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import info from "./reducers";

import { createReducer } from 'redux-orm'
import { orm } from './models'


const middleware = [thunk];

const rootReducer = combineReducers({
  info,
  orm: createReducer(orm)
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
