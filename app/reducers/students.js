import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

//ACTION TYPES
const GET_STUDENTS = 'GET_STUDENTS';
const GET_ONE_STUDENT = 'GET_ONE_STUDENT';
const GET_CAMPUS_STUDENTS = 'GET_CAMPUS_STUDENTS';
const PUT_UPDATED_STUDENT_ON_STATE = 'PUT_UPDATED_STUDENT_ON_STATE';
// const DELETE_STUDENT = 'DELETE_STUDENT';
//ACTION CREATORS
export function getStudents (students) {
    const action = { type: GET_STUDENTS, students };
    return action;
}
export function getCampusStudents (students) {
    const action = {type: GET_CAMPUS_STUDENTS, students};
    return action;
}
export function putUpdatedStudentOnState(student){
    const action = {type: PUT_UPDATED_STUDENT_ON_STATE, student};
    return action;
}
// export function deleteStudent(student){
//     const action = {type:DELETE_STUDENT, student};
//     return action;
// }

//THUNK CREATORS
export function fetchStudents(){
    return function thunk (dispatch) {
        return axios.get('/api/students')
        .then(res => res.data)
        .then(students => {
            const action = getStudents(students);
            dispatch (action);
        });
    }
}
export function fetchCampusStudents(campusid){
    return function thunk (dispatch) {
        return axios.get('/api/campuses/'+campusid+'/students')
        .then(res=>{return res.data})
        .then(campusStudents => {
            const action = getCampusStudents(campusStudents)
            dispatch(action)
        })
    }
}
export function fetchOneStudent(studentid){
    return function thunk (dispatch) {
        return axios.get('/api/students/'+studentid)
        .then(res=>{return res.data})
        .then(student => {
            const action = getStudents(student)
            dispatch(action)
        })
    }
}
export function deleteStudentFromDB(studentid){
    return function thunk(dispatch){
        return axios.delete(`/api/students/${studentid}`)
        .then(axios.get(`/api/students`))
        .then(res=>{return res.data})
        .then(students => {
            const action = getStudents(students)
            dispatch(action)
        });
    }
}


//REDUCER
export default function studentsReducer (state=[], action) {
    switch(action.type){
        case GET_STUDENTS:
            return action.students;
        case GET_CAMPUS_STUDENTS:
            return action.students;
        case PUT_UPDATED_STUDENT_ON_STATE:
            return [...state, action.student]
        // case DELETE_STUDENT:

        //     return action.student;
        default:
            return state;
    }
}