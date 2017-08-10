import React, {Component} from 'react';
import {Link} from 'react-router';
import PollPill from './PollPill.jsx';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
const URL = require('../../config/main.js').MAIN_URL;

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
          let link = URL + "/edit/" + poll.link;
          let voteLink = URL + "/vote/" + poll.link;
          return(
            <ListGroupItem header={poll.title}>
              <a className="pull-right btn btn-xs btn-danger" href={link}>
                Edit
              </a>
              {date.toString().substring(0,24)}<br/>
              {voteLink}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    );
  }

  componentDidMount() {
    console.log("AWAWAWAWAWAJIIIIIII");
    fetch(URL + '/api/getPollByUser', {
      method: 'get',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(resJson => {
        console.log("ISINYA DSAHBOARD HABIS MINTA ", resJson);
        this.setState({
          arrPoll: resJson
        });
      })
      .catch(err => console.error(err));
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
