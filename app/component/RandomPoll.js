import React, {Component} from 'react';
import Vote from './Vote';
import {Link} from 'react-router-dom';

export class RandomPoll extends Component {
  constructor(props) {
    super(props);
    var objc = {
      _id: 10,
      title: "the prettiest, dare?",
      options: [
        {id: 9, name: "Uemura Rina"},
        {id: 12, name: "Kojima Mako"},
        {id: 10, name: "Murayama Yuiri"}
      ]
    };
    this.state = {
      obj: objc
    };
  }

  render() {
    return(
      <div>
        <div className="rand_poll_container">
          <h4>Random Poll</h4>
          <Vote obj={this.state.obj} submitVote={this.props.submitVote}/>
          <div>
            <Link to={{pathname: '/vote', state: this.state.obj}}>View Result</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default RandomPoll;
