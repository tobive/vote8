import React, {Component} from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export class MainContainer extends Component {
  render() {
    return (
      <div className="main">
        <Header user={this.props.user} />
        <div>
        {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

export default MainContainer;
