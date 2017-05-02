import React, {Component} from 'react';
import PollForm from './PollForm';

export class PollFormController extends Component {
  savePollX(obj) {
    console.log("received state: ",obj);
  }

  render() {
    return(
      <PollForm
        header={this.props.header}
        savePoll={this.savePollX}
        />
    );
  }
}

export default PollFormController;
