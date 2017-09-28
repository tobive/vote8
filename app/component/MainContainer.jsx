import React, {Component} from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.closeOverlay = this.closeOverlay.bind(this);
  }

  closeOverlay() {
    let overlay = document.querySelector('.overlay');
    let loginModal = document.querySelector('.login--modal');
    let infoModal = document.querySelector('.info--modal');
    let dialogModal = document.querySelector('.dialog--modal');

    if(loginModal) loginModal.classList.remove('open');
    if(infoModal) infoModal.classList.remove('open');
    if(dialogModal) dialogModal.classList.remove('open');
    overlay.style.display = 'none';
  }

  render() {
    return (
      <div className="page-container">
        <div className="overlay" onClick={this.closeOverlay}></div>
        <div className="login--modal">
          <a href="/auth/twitter">
            <div className="sns-logo-container">
              <svg id="i-twitter" className="bs-icon" viewBox="0 0 64 64">
                <path strokeWidth="0" fill="currentColor" d="M60 16 L54 17 L58 12 L51 14 C42 4 28 15 32 24 C16 24 8 12 8 12 C8 12 2 21 12 28 L6 26 C6 32 10 36 17 38 L10 38 C14 46 21 46 21 46 C21 46 15 51 4 51 C37 67 57 37 54 21 Z">
                </path>
              </svg>
            </div>
          </a>
          <a href="/auth/github">
            <div className="sns-logo-container">
              <svg id="i-github" className="bs-icon" viewBox="0 0 64 64">
                <path strokeWidth="0" fill="currentColor"
                      d="M32 0 C14 0 0 14 0 32 0 53 19 62 22 62 24 62 24 61 24 60 L24 55 C17 57 14 53 13 50 13 50 13 49 11 47 10 46 6 44 10 44 13 44 15 48 15 48 18 52 22 51 24 50 24 48 26 46 26 46 18 45 12 42 12 31 12 27 13 24 15 22 15 22 13 18 15 13 15 13 20 13 24 17 27 15 37 15 40 17 44 13 49 13 49 13 51 20 49 22 49 22 51 24 52 27 52 31 52 42 45 45 38 46 39 47 40 49 40 52 L40 60 C40 61 40 62 42 62 45 62 64 53 64 32 64 14 50 0 32 0 Z">
                </path>
              </svg>
            </div>
          </a>
        </div>
        <div className="info--modal success">
          <p><strong>voted!</strong>&nbsp;Thank you for voting</p>
        </div>
        <div className="info--modal fail">
          <p><strong>failed!</strong>&nbsp;Sorry, there's a problem with server</p>
        </div>
        <Header user={this.props.user} />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default MainContainer;
