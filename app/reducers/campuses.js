import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

//ACTION TYPES
const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_ONE_CAMPUS = 'GET_ONE_CAMPUS';

//ACTION CREATORS
export function getCampuses (campuses) {
    const action = { type: GET_CAMPUSES, campuses };
    return action;
}

export function getOneCampus (campus) {
    const action = {type: GET_ONE_CAMPUS, campus };
    return action;
}

//THUNK CREATORS
export function fetchCampuses(){
    return function thunk (dispatch) {
        return axios.get('/api/campuses')
        .then(res => res.data)
        .then(campuses => {
            const action = getCampuses(campuses);
            dispatch (action);
        });
    }
}
export function fetchOneCampus(campusid){
    return function thunk (dispatch) {
        return axios.get(`/api/campuses/${campusid}`)
        .then(res=>{return res.data})
        .then(campus => {
            const action = getCampuses(campus)
            dispatch(action)
        })
    }
}
//REDUCER
export default function campusesReducer (state=[], action) {
    switch(action.type){
        case GET_CAMPUSES:
            return action.campuses;
        case GET_ONE_CAMPUS:
            return [...state, action.campus];
        default:
            return state;
    }
}