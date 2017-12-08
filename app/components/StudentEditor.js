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
          const uneditedStudent = Object.assign({}, store.getState.students[0])
          const formInput = Object.assign({}, store.getState().studentadder);
          const editedStudent = {};
          for(var key in formInput){
              if(formInput.hasOwnProperty(key)){
                  switch (key){
                    case 'firstName':
                        if(formInput[key].length){
                            editedStudent[key] = formInput[key]
                        }
                        else{
                            editedStudent[key] = uneditedStudent[key]
                        }
                    case 'lastName':
                        if(formInput[key].length){
                            editedStudent[key] = formInput[key]
                        }
                        else{
                            editedStudent[key] = uneditedStudent[key]
                        }
                    case 'email':
                        if(formInput[key].length){
                            editedStudent[key] = formInput[key]
                        }
                        else{
                            editedStudent[key] = uneditedStudent[key]
                        }
                    case 'campusId':
                            if(formInput[key]!='1') editedStudent[key] = formInput[key]
                            else editedStudent[key] = '1'
                    case 'gpa':
                        if(formInput[key]!='0'){
                            editedStudent[key] = formInput[key]
                        }
                        else{
                            editedStudent[key] = uneditedStudent[key]
                        }
                  }
              }
          }console.log('EDITED STUDENT:',editedStudent)


        //   dispatch(editStudent(editedStudent, ownProps.props.match.params.studentid)) 
        //   dispatch(putUpdatedStudentOnState(Object.assign({},store.getState().studentadder)))
          
        //   dispatch(writeStudentEntry({firstName: '', lastName:'', email:'', gpa:0}))
        //   dispatch(fetchOneStudent(ownProps.props.match.params.studentid))
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