import React, {Component} from 'react';
import Vote from './Vote.jsx';
import {Link} from 'react-router';

export class RandomPoll extends Component {
  constructor(props) {
    super(props);
    var objc = {
      _id: 0,
      title: "",
      options: [
        {id: 0, name: ""}
      ]
    };
    this.state = {
      obj: objc
    };
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/getRandom')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("FETCHRANDMPOL :", JSON.stringify(responseJson));
        this.setState({
          obj : responseJson
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    let link = "/vote/" + this.state.obj._id;
    return(
      <div>
        <div className="rand_poll_container">
          <h4>Random Poll</h4>
          <Vote obj={this.state.obj}/>
          <div>
            <Link to={link}>View Result</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default RandomPoll;
