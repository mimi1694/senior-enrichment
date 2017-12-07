import React, { Component } from 'react';
import { connect } from 'react-redux'
import store, { writeStudentEntry, 
    firstnameEntry, 
    lastnameEntry, 
    emailEntry, 
    gpaEntry,
    campusIdEntry,
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
          const studentEdit = Object.assign({}, store.getState().studentadder);
          const editInput = {};
          for(var key in studentEdit){
              if(studentEdit.hasOwnProperty(key)){
                  switch (key){
                    case 'firstName' || 'lastName' || 'email' || 'campusId':
                        editInput[key] = studentEdit[key]
                    case 'gpa':
                        if(studentEdit[key]!=0){
                            editInput[key] = studentEdit[key]//this is the default
                        }
                    default:
                        //return store.getState().students[props.props.match.params.studentid]
                  }
              }
          }
          console.log(ownProps.props)
          dispatch(editStudent(editInput, ownProps.props.match.params.studentid))
          dispatch(writeStudentEntry({firstName: '', lastName:'', email:'', gpa:0}))
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