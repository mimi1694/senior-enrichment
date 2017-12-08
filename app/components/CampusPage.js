import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import store, {fetchCampusStudents} from '../store';
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import { Link } from 'react-router-dom';
import CampusEditor from './CampusEditor'

function mapStateProps (state){
    return{
        campuses: state.campuses,
        students: state.students
    }
}


export class CampusPage extends Component {

    render() {
        console.log(this.props)
        return (
            <div className='content'>
                <h2>Our Campuses</h2>
                <section className='campus-choices'>
                    {this.props.campuses.map((campus)=>{
                        return (
                            <li key={campus.id}>
                                <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
                            </li>
                        )
                    })}
                </section>
                <CampusEditor />
            </div>
    )}
};

const CampusListContainer = connect(mapStateProps)(CampusPage)
export default withRouter(CampusListContainer);