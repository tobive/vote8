import React, {Component} from 'react';
import PollPill from './PollPill';

export class LatestPoll extends Component {
  render() {
    var arr = [1,2,3,4,5,6,7,8,9,10,11,12];
    var xxx = this.props.goToPoll;
    return(
      <div>
        <div className="late_poll_container text-left">
          <h3><b>Latest Poll</b></h3>
          <div className="late_poll">
            {arr.map(function(x){
              return <PollPill IdPoll={x} goToPoll={xxx} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default LatestPoll;
