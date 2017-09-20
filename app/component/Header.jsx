import React, {Component} from 'react';
import {Link} from 'react-router';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.open = this.open.bind(this);
  }

  open() {
    let overlay = document.querySelector('.overlay');
    let loginModal = document.querySelector('.login--modal');

    overlay.style.display = 'block';
    loginModal.classList.toggle('open');
  }

  loginButton() {
    return (
      <ul className="nav--list">
        <li className="nav--item">
          <a className="navbar-brand" onClick={this.open}>
            Login
          </a>
        </li>
      </ul>
    );
  }

  logoutButton(props) {
    return (
      <ul className="nav--list">
        <li className="nav--item">
          <a href="/logout">
            Logout
          </a>
        </li>
        <li className="nav--item">
          <Link to="/dashboard">
            Dashboard
          </Link>
        </li>
      </ul>
    );
  }

  render() {
    let login = this.loginButton();
    if (this.props.user) { login = this.logoutButton(this.props.user.name); }
    return (
      <header className="header">
        <div className="header-logo">
          <Link className="navbar-brand" to="/">Vote8</Link>
        </div>
        <div id="drawer" className="nav">
          {login}
        </div>
      </header>
    );
  }
};

export default Header;
