import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index.js';
import loggingMiddleware from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
//import { composeWithDevTools } from 'redux-devtools-extension';
import students from './reducers/students';
import campuses from './reducers/campuses';


export default createStore(rootReducer, applyMiddleware(thunkMiddleware, loggingMiddleware));
export * from './reducers'