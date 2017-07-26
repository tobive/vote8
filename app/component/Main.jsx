import React, {Component} from 'react';
import MainContainer from './MainContainer.jsx';

//------------------------------index.js-----------------------
export class Main extends Component {
  render() {
    console.log("YOO, ",this.props.user);
    return (
      <MainContainer user={this.props.user}>
        {this.props.children}
      </MainContainer>
    );
  }
};

export default Main;
