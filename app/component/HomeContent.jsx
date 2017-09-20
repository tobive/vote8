import React, {Component} from 'react';
import HomeCreatePoll from './HomeCreatePoll.jsx';
import RandomPoll from './RandomPoll.jsx';
import LatestPoll from './LatestPoll.jsx';

export class HomeContent extends Component {
  render() {
    return(
      <main className="main-container">
        <HomeCreatePoll createPoll={this.props.createPoll}/>
        <RandomPoll submitVote={this.props.submitVote}/>
        <LatestPoll goToPoll={this.props.goToPoll} />
      </main>
    );
  }
}

export default HomeContent;
