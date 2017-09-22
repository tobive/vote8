import React, {Component} from 'react';
import PollPill from './PollPill.jsx';
const URL = process.env.APP_URL || require('../../config/main.js').MAIN_URL;

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
    return(
      <section className="poll-latest">
        <h2>Latest Poll</h2>
        <ul className="poll-latest--list">
        {arr.map(function(poll){
          return <PollPill key={poll._id} objPoll={poll}/>;
        })}
        </ul>
      </section>
    );
  }
}

export default LatestPoll;
