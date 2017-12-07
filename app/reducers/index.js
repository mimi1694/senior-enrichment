/* combineReducers is not currently used, but eventually should be for modular code :D */
import { combineReducers } from 'redux'

import students from './students';
import campuses from './campuses';
import studentadder from './studentadder';

const rootReducer = combineReducers({
  students,
  campuses,
  studentadder
})

const initialState = {};

export default rootReducer;
export * from './campuses';
export * from './students';
export * from './studentadder';