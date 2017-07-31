import React, {Component} from 'react';
import {Link} from 'react-router';
import PollPill from './PollPill.jsx';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrPoll: this.props.obj ? this.props.obj : []
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log("MELBU KENEK GAK SIIIOIIIHHHH\n");
    this.setState({
      arrPoll: this.props.obj ? this.props.obj : []
    }, ()=> console.log("WILL RECEIVE PROPS: ",this.state.arrPoll));
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
          <h3><b>Latest Poll</b></h3>
          <div className="late_poll">
            {arr.map(function(poll){
              return <PollPill key={poll._id} IdPoll={poll._id} title={poll.title} linkPoll={poll.link}/>;
            })}
          </div>
        </div>

      </div>
    );
  }
}

export default Dashboard;
