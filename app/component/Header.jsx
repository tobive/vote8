import React, {Component} from 'react';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    console.log("HEADER SESSION : ", this.props.user);
  }

  open() {
    this.setState({ showModal: true });
  }

  close() {
    this.setState({ showModal: false });
  }

  modal() {
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <div>
            <a className="navbar-brand" href="/auth/twitter">
              Login Twitter
            </a>
          </div>
          <div>
            <a className="navbar-brand" href="/auth/github">
              Login Github
            </a>
          </div>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    );
  }

  loginButton() {
    return (
      <a className="navbar-brand" onClick={this.open}>
        Login
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
    let modal = this.modal();
    if (this.props.user) { login = this.logoutButton(this.props.user.name); }
    return (
      <section>
        <div className="header">
          <nav className="navbar navbar-default">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">Vote8</Link>
            </div>
            {login}
            {modal}
          </nav>
        </div>
      </section>
    );
  }
};

export default Header;
