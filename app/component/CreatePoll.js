import React, {Component} from 'react';
import PollFormController from './PollFormController';

//------------------------------index.js-----------------------
export class CreatePoll extends Component {
  render() {
    return (
      <PollFormController header="Create Poll" />
    );
  }
};

export default CreatePoll;
