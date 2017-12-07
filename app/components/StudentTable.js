import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import store, { fetchCampusStudents } from '../store';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import StudentAdder from './StudentAdder'

function mapStateProps(state) {
    return {
        students: state.students,
        campuses: state.campuses
    }
}


export function StudentTable(props) {
    return (
        <div className='content'>
            <h3>STUDENT INFORMATION
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Campus</th>
                    </tr>
                    {(props.students) &&
                        props.students.map((student) => {
                            return (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td><Link to={`/students/${student.id}`}>{student.fullName}</Link></td>
                                    <td>{(student && props.campuses) && props.campuses[student.campusId - 1].name}</td>
                                </tr>
                            )
                        })
                    }
                </table>
                <br />
                <StudentAdder props={props}/>
                
            </h3>
        </div>
    )

}

const StudentTableListContainer = connect(mapStateProps)(StudentTable)
export default withRouter(StudentTableListContainer);