import React, { Component } from 'react';
import { connect } from 'react-redux'
import store, { writeStudentEntry, 
    firstnameEntry, 
    lastnameEntry, 
    emailEntry, 
    gpaEntry,
    campusIdEntry,
    putUpdatedStudentOnState,
    fetchOneStudent,
    editStudent } from '../store'

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
        handleCampusChange: function(event) {
            return dispatch(campusIdEntry(event.target.value))
        },
        handleSubmit: function (event) {
          event.preventDefault();
          const uneditedStudent = Object.assign({}, ownProps.props.students[0])
          const formInput = Object.assign({}, store.getState().studentadder);
          const editedStudent = {};
          for(var key in formInput){
              if(formInput.hasOwnProperty(key)){
                  switch (key){
                    case 'firstName':
                        if(formInput.firstName.length){
                            editedStudent.firstName = formInput.firstName
                        }
                        else{
                            editedStudent.firstName = uneditedStudent.firstName
                        }
                    case 'lastName':
                        if(formInput.lastName.length){
                            editedStudent.lastName = formInput.lastName
                        }
                        else{
                            editedStudent.lastName = uneditedStudent.lastName
                        }
                    case 'email':
                        if(formInput.email.length){
                            editedStudent.email = formInput.email
                        }
                        else{
                            editedStudent.email = uneditedStudent.email
                        }
                    case 'campusId':
                            if(formInput.campusId!='1') editedStudent.campusId = formInput.campusId
                            else editedStudent.campusId = '1'
                    case 'gpa':
                        if(formInput.gpa!='0'){
                            editedStudent.gpa = formInput.gpa
                        }
                        else{
                            editedStudent.gpa = uneditedStudent.gpa
                        }
                  }
              }
          }

          dispatch(editStudent(editedStudent, ownProps.props.match.params.studentid)) 
          dispatch(writeStudentEntry({
            firstName: '',
            lastName: '',
            email: '',
            gpa: 0,
            campusId: 1
            }))
          dispatch(fetchOneStudent(ownProps.props.match.params.studentid))
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

export function StudentEditor(props) {
    return (
        <div>
        <form onSubmit={props.handleSubmit}>
            <div>
            <label>Edit this Student</label>
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
            <label>Campus ID:
            <input
                name='campusId'
                type='text'
                onChange={props.handleCampusChange}
                value={props.campusId}
                />
            </label>
            </div>
            <div>
            <button type="submit">Edit Student</button>
            </div>
          </form>
        </div>    
    )
}

const StudentEditorContainer = connect(mapStateToProps, mapDispatchToProps)(StudentEditor)
export default StudentEditorContainer