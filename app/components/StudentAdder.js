import React, { Component } from 'react';
import { connect } from 'react-redux'
import store, { writeStudentEntry, 
                firstnameEntry, 
                lastnameEntry, 
                emailEntry, 
                gpaEntry,
                campusIdEntry,
                fetchStudents,
                postStudent } from '../store'

function findCampus(campusName){
    for(var i =0; i<store.getState().campuses.length; i++){
        if(store.getState().campuses[i].name==campusName){
            if(store.getState().campuses[i].id){
                return store.getState().campuses[i].id;
            }
            else{
                console.log('campus does not exist!')
            }
        }
    }
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleFirstNameChange: function (event) {
        return dispatch(firstnameEntry(event.target.value))
    },
    handleLastNameChange: function(event) {
        return dispatch(lastnameEntry(event.target.value))
    },
    handleEmailChange: function(event) {
        return dispatch(emailEntry(event.target.value))
    },
    handleGPAChange: function(event) {
        return dispatch(gpaEntry(event.target.value))
    },
    handleCampusId: function(event) {
        //TODO: get this to work

        // console.log(ownProps.props.location)
        // if(ownProps.props.location.pathname.includes('campuses')){
        //     const location = ownProps.props.match.location.pathname;
        //     return dispatch(campusIdEntry(location.charAt(location.length-1)))
        // }
        // else{
        //     return dispatch(findCampus(event.target.value))
        // }
    },
    handleSubmit: function (event) {
      event.preventDefault();
      const student = Object.assign({}, store.getState().studentadder);
      dispatch(postStudent(student))
      dispatch(writeStudentEntry({firstName: '', lastName:'', email:'', gpa:0, campusId:1}))
      dispatch(fetchStudents())
    }
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    studentadder: state.studentadder,
    campuses: state.campuses,
    students: state.students
  }
}

export function StudentAdder(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <label>Create a New Student</label>
        <br />
        <label>First Name:
            <input
                name='firstName'
                type='text'
                onChange={props.handleFirstNameChange}
                value={props.firstname}
            />
        </label>
        <br />
        <label>Last Name:
            <input
                name='lastName'
                type='text'
                onChange={props.handleLastNameChange}
                value={props.lastname}
            />
        </label>
        <br />
        <label>Email Address:
        <input
            name='email'
            type='text'
            onChange={props.handleEmailChange}
            value={props.email}
            />
        </label>
        <br />
        <label>GPA:
        <input
            name='gpa'
            type='text'
            onChange={props.handleGPAChange}
            value={props.gpa}
            />
        </label>
        <br />
        
        {/* 
            TODO: Have a campus field only on students page
            !props.props.match.path.includes('campuses') && 
            <label>Campus Name:
                <input
                name='campusId'
                type='text'
                onChange={props.handleCampusId}
                value={props.gpa}
                />
            </label>
  */}
      </div>
      <div>
        <button type="submit">Create Student</button>
      </div>
    </form>
  );
}

const StudentAdderContainer = connect(mapStateToProps, mapDispatchToProps)(StudentAdder)
export default StudentAdderContainer
