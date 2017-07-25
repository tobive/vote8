import React, {Component} from 'react';
import HomeCreatePoll from './HomeCreatePoll.jsx';
import RandomPoll from './RandomPoll.jsx';
import LatestPoll from './LatestPoll.jsx';

export class HomeContent extends Component {
  render() {
    return(
      <section>
        <div className="container-fluid text-center">
          <HomeCreatePoll
            // createPoll={this.props.createPoll}
            />
          <div className="row content">
            <div className="col-sm-4">
              <RandomPoll submitVote={this.props.submitVote}/>
            </div>
            <div className="col-sm-8">
              <LatestPoll goToPoll={this.props.goToPoll} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default HomeContent;
