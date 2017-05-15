import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export class Header extends Component {
  render() {
    return (
      <section>
        <div className="header">
          <nav className="navbar navbar-default">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Vote8</a>
            </div>
            <ul className="nav navbar-nav">
              <li><Link to="/getRandom">Login</Link></li>
            </ul>
          </nav>
        </div>
      </section>
    );
  }
};

export default Header;
