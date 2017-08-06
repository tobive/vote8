import React, {Component} from 'react';
import Vote from './Vote.jsx';
import PollChart from './PollChart.jsx';

export class ShowPoll extends Component {
    constructor(props) {
        super(props);
        const objPoll = this.props.pollServer;
        this.state = {
          poll: objPoll
        };
        //this.submitVote = this.submitVote.bind(this);
    }

    submitVote(ballot) {
        // console.log("from ShowPoll :",ballot);
        // this.setState({
        //   idBallot: ballot,
        //   resultPoll: this.props.resultPoll
        // }, ()=> {
        //   const objBallot = {
        //     idPoll: this.state.idPoll,
        //     idBallot: this.state.idBallot
        //   }
        //   this.props.sendBallot(objBallot);
        // });
    }

    render() {
        console.log("INSIDE SHOWPOLL: ", this.props.pollServer);
        let poll = this.state.poll;
        return(
          <section>
            <div className="row">
              <div className="show_left col-sm-6">
                <div className="poll_box text-center">
                  <Vote obj = {poll}/>
                </div>
              </div>
              <div className="show_right col-sm-6">
                <div className="poll_chart text-center">
                  <PollChart options={poll.options} />
                </div>
              </div>
            </div>
          </section>
        );
    }
}

export default ShowPoll;
