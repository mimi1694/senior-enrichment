import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import store from '../store';

// let imgUrl = '.././public/homebackground.jpg'
// let styles = {
//   root: {
//     backgroundImage: `url(${ imgUrl })`,
//     backgroundRepeat  : 'no-repeat',
//     backgroundPosition: 'center'
// }
// }


function mapStateProps(state) {
  return {
      students: state.students,
      campuses: state.campuses
  }
}

export function HomePage (props) {
  return(
      <div >
        <img src="http://www.hwslakeview.com/wp-content/uploads/2015/12/191630.jpg"/>
      </div>
    )
}
const HomePageListContainer = connect(mapStateProps)(HomePage)
export default withRouter(HomePageListContainer);