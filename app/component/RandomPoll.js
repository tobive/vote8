import React, {Component} from 'react';
import Vote from './Vote';

export class RandomPoll extends Component {
  render() {
    return(
      <div>
        <div className="rand_poll_container">
          <h4>Random Poll</h4>
          <Vote submitVote={this.props.submitVote}/>
        </div>
      </div>
    );
  }
}

export default RandomPoll;
