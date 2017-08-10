import React, {Component} from 'react';
import PollPill from './PollPill.jsx';
const URL = require('../../config/main.js').MAIN_URL;

export class LatestPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrPoll: []
    };
  }

  componentDidMount() {
    fetch(URL + '/api/getLatest')
      .then((res) => res.json())
      .then((resJson) => {
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
    // let xxx = this.props.goToPoll;
    return(
      <div>
        <div className="late_poll_container text-left">
          <h3><b>Latest Poll</b></h3>
          <div className="late_poll">
            {arr.map(function(poll){
              return <PollPill key={poll._id} objPoll={poll}/>;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default LatestPoll;
