import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import store, {fetchCampuses, fetchStudents} from '../store';
import Navbar from './Navbar'
import CampusPage from './CampusPage'
import CampusInfo from './CampusInfo'
import StudentPage from './StudentPage'
import StudentTable from './StudentTable'
import HomePage from './HomePage'

export default class Root extends Component {
  componentDidMount () {
    const campusesThunk = fetchCampuses();
    store.dispatch(campusesThunk);
    const studentsThunk =fetchStudents();
    store.dispatch(studentsThunk);
  }

  render() {
    return (
      <div>
        <Navbar />
        <main>
          <Switch>
            <Route exact path='/campuses' component={CampusPage} />
            <Route path='/campuses/:campusid' component={CampusInfo} />
            <Route exact path='/students' component={StudentTable} />
            <Route path='/students/:studentid' component={StudentPage} />
            <Route path='/home' component={HomePage} />
            <Redirect to='/home' />
          </Switch>
        </main>
      </div>
    )
  }
}