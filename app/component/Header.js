import React, {Component} from 'react';

export class Header extends Component {
  constructor(props) {
    super(props);
    console.log("HEADER SESSION : ");
  }

  loginButton() {
    return (
      <a className="navbar-brand" href="/auth/twitter">
        Login Twitter
      </a>
    );
  }

  logoutButton() {
    return (
      <a className="navbar-brand" href="/logout">
        Logout
      </a>
    );
  }

  render() {
    let login = this.loginButton();
    if (false) { login = this.logoutButton(); }
    return (
      <section>
        <div className="header">
          <nav className="navbar navbar-default">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">Vote8</a>
            </div>
            <ul className="nav navbar-nav">
              {login}
            </ul>
          </nav>
        </div>
      </section>
    );
  }
};

export default Header;
