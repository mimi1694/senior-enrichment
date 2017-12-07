import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render () {
    return (
      <nav>
        <h3>Welcome to School!</h3>
        <section>
        <h4 className="navigation">
            <Link to="/home">HOME</Link>
        </h4>
        </section>
        <section>
            <h4 className="navigation">
                <Link to="/campuses">CAMPUSES</Link>
            </h4>
        </section>
        <section>
        <h4 className="navigation">
            <Link to="/students">STUDENTS</Link>
        </h4>
    </section>
      </nav>    
    );
  }
}
