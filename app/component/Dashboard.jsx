import React, {Component} from 'react';
import {Link} from 'react-router';
import PollPill from './PollPill.jsx';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrPoll: this.props.obj ? this.props.obj : []
    };
  }

  renderListGroup(polls) {
    return (
      <ListGroup>
        {polls.map((poll)=>{
          let date = new Date(poll.date);
          let link = "http://localhost:8000/edit/" + poll.link;
          return(
            <ListGroupItem header={poll.title} href={link}>
              {date.toString().substring(0,24)}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    );
  }

  render() {
    let name = this.props.user ? this.props.user.name : "";
    let id = this.props.user ? this.props.user._id : "";
    let arr = this.state.arrPoll;
    return(
      <div>
        <div>
          WELCOME, {name} TO YOUR DASHBOARD. ID: {id}
        </div>
        <div>
          <Link className="btn btn-lg btn-success" to="/create">
            Create New Poll
          </Link>
        </div>
        <div className="late_poll_container">
          <h3><b>Manage Your Polls</b></h3>
          {this.renderListGroup(arr)}
        </div>
      </div>
    );
  }
}

export default Dashboard;

// <div className="late_poll">
//   {arr.map(function(poll){
//     return <PollPill key={poll._id} objPoll={poll}/>;
//   })}
// </div>
