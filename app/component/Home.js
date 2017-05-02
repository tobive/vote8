import React, {Component} from 'react';
import MainContainer from './MainContainer';
import HomeContent from './HomeContent';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
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
          // createPoll={this.changePage}
          goToPoll={this.goToPoll}
        />
    );
  }
}

export default Home;
