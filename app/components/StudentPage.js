import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import store, {fetchstudentes, fetchStudents, fetchOneStudent} from '../store';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import StudentEditor from './StudentEditor'

function mapStateProps(state) {
    return {
        students: state.students,
        campuses: state.campuses
    }
}

function mapDispatchProps(state, ownProps) {
    return {
        fetchOneStudent
    }
}

export class StudentPage extends Component {
    componentDidMount() {
        const studentPageThunk = fetchOneStudent(this.props.match.params.studentid);
        store.dispatch(studentPageThunk);
    }
    
    componentWillUnmount() {
        const studentsThunk = fetchStudents();
        store.dispatch(studentsThunk)
    }

    render() {
        const currentStudent = this.props.students[0]
        return (
            <div className='content'>
            {currentStudent && <h3>{`${currentStudent.fullName}`}</h3>}
            {currentStudent  && this.props.campuses[currentStudent.campusId-1] && <Link to={`/campuses/${currentStudent.campusId}`}>
                Campus: {this.props.campuses[currentStudent.campusId-1].name}</Link>}
            {currentStudent && <div>ID:  {currentStudent.id}  GPA:  {currentStudent.gpa}  CONTACT:  {currentStudent.email}</div>}
            <br />
            <StudentEditor props={this.props}/>
            </div>

    )}
}
const StudentPageListContainer = connect(mapStateProps)(StudentPage)
export default withRouter(StudentPageListContainer)