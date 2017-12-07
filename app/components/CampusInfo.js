import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import store, { fetchCampuses, fetchStudents, fetchCampusStudents } from '../store';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import StudentTable from './StudentTable'

function mapStateProps(state) {
    return {
        campuses: state.campuses,
        students: state.students
    }
}

function mapDispatchProps(state, ownProps) {
    console.log('we\'re dispatching!', ownProps)
    return {
        fetchCampusStudents
    }
}

export class CampusInfo extends Component {
    componentDidMount() {
        const campusStudentsThunk = fetchCampusStudents(this.props.match.params.campusid);
        store.dispatch(campusStudentsThunk);
    }

    componentWillUnmount() {
        const studentsThunk = fetchStudents();
        store.dispatch(studentsThunk)
    }

    render() {
        const campus = this.props.campuses[this.props.match.params.campusid - 1]
        return (
            <div className='content'>
                {campus &&
                    <div><h2>{`Welcome to the ${campus.name} Campus!`}</h2>
                    <StudentTable />
                </div>}
            </div>
        )
    }
}
const CampusInfoListContainer = connect(mapStateProps, mapDispatchProps)(CampusInfo)
export default withRouter(CampusInfoListContainer)