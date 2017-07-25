import React, {Component} from 'react';
import MainContainer from './MainContainer.jsx';

//------------------------------index.js-----------------------
export class Main extends Component {
  render() {
    console.log("YOO, ",this.props.pack);
    return (
      <MainContainer>
        {this.props.children}
      </MainContainer>
    );
  }
};

export default Main;
