import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';

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
