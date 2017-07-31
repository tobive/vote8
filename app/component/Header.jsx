import React, {Component} from 'react';
import {Link} from 'react-router';

export class Header extends Component {
  constructor(props) {
    super(props);
    var test = 'paramXXX';
    console.log("HEADER SESSION : ", this.props.user);
  }

  loginButton() {
    return (
      <a className="navbar-brand" href="/auth/twitter">
        Login Twitter
      </a>
    );
  }

  logoutButton(props) {
    return (
      <div>
        <ul className="nav navbar-nav">
          Welcome, {props}!
          <a className="navbar-brand" href="/logout">
            Logout
          </a>
        </ul>
        <ul className="nav navbar-nav">
          <Link className="navbar-brand" to="/dashboard">
            Dashboard
          </Link>
        </ul>
      </div>
    );
  }

  render() {
    let login = this.loginButton();
    if (this.props.user) { login = this.logoutButton(this.props.user.name); }
    return (
      <section>
        <div className="header">
          <nav className="navbar navbar-default">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">Vote8</Link>
            </div>
            {login}
          </nav>
        </div>
      </section>
    );
  }
};

export default Header;
