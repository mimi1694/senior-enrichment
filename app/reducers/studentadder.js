import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    gpa: 0,
    campusId: 1
}

const RECIEVE_STUDENT_ENTRY = 'RECEIVE_STUDENT_ENTRY'
const WRITE_STUDENT_ENTRY = 'WRITE_STUDENT_ENTRY'
const FIRSTNAME_ENTRY ='FIRSTNAME_ENTRY'
const LASTNAME_ENTRY= 'LASTNAME_ENTRY'
const EMAIL_ENTRY = 'EMAIL_ENTRY'
const GPA_ENTRY = 'GPA_ENTRY'
const CAMPUS_ID_ENTRY = 'CAMPUS_ID_ENTRY'
const UPDATE_STUDENT = 'UPDATE_STUDENT'

export function recieveStudentEntry (student) {
    const action = { type: RECIEVE_STUDENT_ENTRY, student}
    return action;
}
export function writeStudentEntry (student) {
    const action = { type: WRITE_STUDENT_ENTRY, student}
    return action;
}
export function firstnameEntry (firstname){
    const action = { type:FIRSTNAME_ENTRY, firstname}
    return action;
}
export function lastnameEntry (lastname){
    const action = { type:LASTNAME_ENTRY, lastname}
    return action;
}
export function emailEntry (email){
    const action = { type:EMAIL_ENTRY, email}
    return action;
}
export function gpaEntry (gpa){
    const action = { type:GPA_ENTRY, gpa}
    return action;
}
export function campusIdEntry (id){
    const action = { type:CAMPUS_ID_ENTRY, id}
    return action;
}
export function updateStudent (student){
    const action = { type:UPDATE_STUDENT, student}
    return action;
}

export function postStudent(student){
    return function thunk (dispatch) {
        return axios.post('api/students', student)
        .then(res=>res.data)
        .then(newStudent => {
            const action = recieveStudentEntry(newStudent);
            dispatch(action);
        })
    }
}

export function editStudent(studentInfo, id){
    return function thunk (dispatch){
        return axios.put(`/api/students/${id}`, studentInfo)
        .then(res=>res.data)
        .then(editedStudent => {
            const action = updateStudent(editedStudent);
            dispatch (action);
        })
    }
}

export default function newStudentEntryReducer (state = initialState, action) {
    switch (action.type) {
    case WRITE_STUDENT_ENTRY:
        return  initialState;
    case RECIEVE_STUDENT_ENTRY:
        return [...state, action.student];
    case FIRSTNAME_ENTRY:
        state.firstName = action.firstname
        return state
    case LASTNAME_ENTRY:
        state.lastName = action.lastname
        return state
    case EMAIL_ENTRY:
        state.email = action.email
        return state
    case GPA_ENTRY:
        state.gpa = action.gpa
        return state
    case CAMPUS_ID_ENTRY:
        state.campusId = action.id
        return state
    case UPDATE_STUDENT:
    //need to make a shallow copy and replace
        //const shallow = state.map(()=>)
        state = action.student
        return state
    default:
        return state;
    }
}
