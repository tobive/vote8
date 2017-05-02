/* eslint-disable */
import React, {Component} from 'react';
import MainContainer from './MainContainer';

//------------------------------index.js-----------------------
export class Main extends Component {
  render() {
    return (
      <MainContainer>
        {this.props.children}
      </MainContainer>
    );
  }
};

export default Main;
