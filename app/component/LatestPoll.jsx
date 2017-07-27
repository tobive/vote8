import React, {Component} from 'react';
import PollPill from './PollPill.jsx';

export class LatestPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrPoll: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/getLatest')
      .then((res) => res.json())
      .then((resJson) => {
        //console.log("LATESPOLLFETCH: " + JSON.stringify(responseJson));
        this.setState({
          arrPoll: resJson
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
