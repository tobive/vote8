import React, {Component} from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export class MainContainer extends Component {
  render() {
    return (
      <div className="main">
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default MainContainer;
