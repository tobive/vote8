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
    let legend = "Random Poll";
    return(
      <section className="poll-random">
        <Vote obj={this.state.obj} legend={legend}/>
        <div>
          <a href={link}>View Result</a>
        </div>
      </section>
    );
  }
}

export default RandomPoll;
