import React, {Component} from 'react';
import {Link} from 'react-router';

export class Dashboard extends Component {
  render() {
    let name = this.props.user ? this.props.user.name : "";
    let id = this.props.user ? this.props.user._id : "";
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
      </div>
    );
  }
}

export default Dashboard;
