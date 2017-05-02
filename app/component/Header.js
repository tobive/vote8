import React, {Component} from 'react';

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
              <li><a href="#">Login</a></li>
            </ul>
          </nav>
        </div>
      </section>
    );
  }
};

export default Header;
