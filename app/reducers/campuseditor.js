import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const initialState = {
    name:'',
    imageUrl:'',
    description:null
}

const RECIEVE_CAMPUS_ENTRY = 'RECEIVE_CAMPUS_ENTRY'
const WRITE_CAMPUS_ENTRY = 'WRITE_CAMPUS_ENTRY'
const NAME_ENTRY = 'NAME_ENTRY';
const IMAGEURL_ENTRY='IMAGEURL_ENTRY';
const DESCRIPTION_ENTRY='DESCRIPTION_ENTRY'
const CAMPUS_ID_ENTRY = 'CAMPUS_ID_ENTRY'
const UPDATE_CAMPUS = 'UPDATE_CAMPUS'

export function recieveCampusEntry (campus) {
    const action = { type: RECIEVE_CAMPUS_ENTRY, campus}
    return action;
}
export function writeCampusEntry (campus) {
    const action = { type: WRITE_CAMPUS_ENTRY, campus}
    return action;
}
export function nameEntry (name){
    const action = { type:NAME_ENTRY, name}
    return action;
}
export function imageUrlEntry (imageUrl){
    const action = { type:IMAGEURL_ENTRY, imageUrl}
    return action;
}
export function descriptionEntry (description){
    const action = { type:DESCRIPTION_ENTRY, description}
    return action;
}
export function updateCampus (campus){
    const action = { type:UPDATE_CAMPUS, campus}
    return action;
}

export function postCampus(campus){
    return function thunk (dispatch) {
        return axios.post('/api/campuses', campus)
        .then(res=>res.data)
        .then(newcampus => {
            const action = recieveCampusEntry(newcampus);
            dispatch(action);
        })
    }
}

export function editCampus(campusInfo, id){
    return function thunk (dispatch){
        return axios.put(`/api/campuses/${id}`, campusInfo)
        .then(res=>res.data)
        .then(editedCampus=> {
            const action = updateCampus(editedCampus);
            dispatch (action);
        })
    }
}

export default function newCampusEntryReducer (state = initialState, action) {
    switch (action.type) {
    case WRITE_CAMPUS_ENTRY:
        return  initialState;
    case RECIEVE_CAMPUS_ENTRY:
        return state;
    case NAME_ENTRY:
        state.name = action.name
        return state
    case IMAGEURL_ENTRY:
        state.imageUrl = action.imageUrl
        return state
    case DESCRIPTION_ENTRY:
        state.description = action.description
        return state
    case UPDATE_CAMPUS:
        state = action.campus
        return state
    default:
        return state;
    }
}
