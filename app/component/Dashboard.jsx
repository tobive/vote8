import React, {Component} from 'react';
import {Link} from 'react-router';
import PollPill from './PollPill.jsx';
const URL = process.env.APP_URL || require('../../config/main.js').MAIN_URL;

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrPoll: this.props.obj ? this.props.obj : []
    };
  }

  renderListGroup(polls) {
    return (
      <tbody>
        {polls.map((poll)=>{
          let date = new Date(poll.date);
          let link = URL + "/edit/" + poll.link;
          let voteLink = URL + "/vote/" + poll.link;
          return(
            <tr>
              <td>
                <a href={link}>
                  <div className="edit-option--button button--td">
                    Edit
                  </div>
                </a>
              </td>
              <td className="title--td">{poll.title}</td>
              <td className="date--td">{date.toString().substring(0,24)}</td>
              <td className="link--td">{voteLink}</td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  componentDidMount() {
    fetch(URL + '/api/getPollByUser', {
      method: 'get',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(resJson => {
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
      <main className="main-dashboard">
        <section className="dashboard-1">
          <h1>Welcome back, {name}</h1>
          <p>Create new poll or manage your polls</p>
          <Link to="/create">
            <div className="dashboard-create">
              Create New Poll
            </div>
          </Link>
        </section>
        <section className="table-dashboard">
          <table className="poll-list--table">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Date</th>
                <th>Link</th>
              </tr>
            </thead>
            {this.renderListGroup(arr)}
          </table>
        </section>
      </main>
    );
  }
}

export default Dashboard;
