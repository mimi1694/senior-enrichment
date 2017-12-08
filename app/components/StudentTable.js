import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import store, { fetchCampusStudents, deleteStudentFromDB, fetchStudents } from '../store';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import StudentAdder from './StudentAdder'

function mapStateProps(state) {
    return {
        students: state.students,
        campuses: state.campuses
    }
}
function mapDispatchProps (dispatch, ownProps){
    return{
        handleClick: function(event){
            event.preventDefault();
            dispatch(deleteStudentFromDB(event.target.value))
            //dispatch(fetchStudents())
        }
    }
}

export function StudentTable(props) {
    return (
        <div className='content'>
            <h3>STUDENT INFORMATION
                <table>
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Campus</th>
                        <th>Delete</th>
                    </tr>
                    {(props.students) &&
                        props.students.map((student) => {
                            return (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td><Link to={`/students/${student.id}`}>{student.fullName}</Link></td>
                                    <td>{(student && props.campuses) && props.campuses[student.campusId - 1].name}</td>
                                    <td><button onClick={props.handleClick} value={student.id}>X</button></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                <br />
                <StudentAdder props={props}/>
                
            </h3>
        </div>
    )

}

const StudentTableListContainer = connect(mapStateProps, mapDispatchProps)(StudentTable)
export default withRouter(StudentTableListContainer);