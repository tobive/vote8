import React, {Component} from 'react';

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
        Welcome, {props}!
        <a className="navbar-brand" href="/logout">
          Logout
        </a>
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
