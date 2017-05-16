import React, {Component} from 'react';
import PollPill from './PollPill';

export class LatestPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrPoll: []
    };
  }

  componentDidMount() {
      fetch('http://localhost:8000/api/getLatest')
        .then((response) => response.json())
        .then((responseJson) => {
          //console.log("LATESPOLLFETCH: " + JSON.stringify(responseJson));
          this.setState({
            arrPoll: responseJson
          });
        })
        .catch((error) => {
          console.error(error);
        });
  }

  render() {
    let arr = this.state.arrPoll;
    let xxx = this.props.goToPoll;
    return(
      <div>
        <div className="late_poll_container text-left">
          <h3><b>Latest Poll</b></h3>
          <div className="late_poll">
            {arr.map(function(poll){
              return <PollPill key={poll._id} IdPoll={poll._id} title={poll.title} goToPoll={xxx} linkPoll={poll.link}/>;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default LatestPoll;
