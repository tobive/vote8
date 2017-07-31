import React, {Component} from 'react';
import MainContainer from './MainContainer.jsx';
import HomeContent from './HomeContent.jsx';
//import {Link} from 'react-router-dom';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
    console.log("HEY THERE ", this.props.pack);
    // this.changePage = this.changePage.bind(this);
  }

  // changePage(obj) {
  //   this.setState({
  //   page: this.state.page===1 ? 0 : 1
  // });
  // }

  castVote(ballot) {
    console.log("from castVote: ",ballot);
  }

  goToPoll(idPoll) {
    console.log("open ",idPoll);

  }

  render() {
    return(
        <HomeContent
          submitVote={this.castVote}
          createPoll={this.changePage}
          goToPoll={this.goToPoll}
        />
    );
  }
}

export default Home;
