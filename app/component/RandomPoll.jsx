import React, {Component} from 'react';
import Vote from './Vote.jsx';
const URL = require('../../config/main.js').MAIN_URL;

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
    fetch(URL + '/api/getRandom')
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
    let link = URL + "/vote/" + this.state.obj.link;
    return(
      <div>
        <div className="rand_poll_container">
          <h4>Random Poll</h4>
          <Vote obj={this.state.obj}/>
          <div>
            <a href={link}>View Result</a>
          </div>
        </div>
      </div>
    );
  }
}

export default RandomPoll;
