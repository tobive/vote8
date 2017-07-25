import React, {Component} from 'react';
import Vote from './Vote.jsx';
import PollChart from './PollChart.jsx';

export class ShowPoll extends Component {
    constructor(props) {
        super(props);
        const objPoll = props.poll;
        this.state = {
          idPoll: objPoll._id,
          idBallot: null,
          resultPoll: props.resultPoll
        };
        this.submitVote = this.submitVote.bind(this);
    }

    submitVote(ballot) {
        console.log("from ShowPoll :",ballot);
        this.setState({
          idBallot: ballot,
          resultPoll: this.props.resultPoll
        }, ()=> {
          const objBallot = {
            idPoll: this.state.idPoll,
            idBallot: this.state.idBallot
          }
          this.props.sendBallot(objBallot);
        });
    }

    render() {
        var poll = this.props.poll;
        return(
          <section>
            <div className="row">
              <div className="show_left col-sm-6">
                <div className="poll_box text-center">
                  <Vote
                    obj = {this.props.poll}
                    />
                </div>
              </div>
              <div className="show_right col-sm-6">
                <div className="poll_chart text-center">
                  <canvas id="pollChart" width="400" height="400"></canvas>
                  <PollChart poll={this.state.resultPoll} />
                </div>
              </div>
            </div>
          </section>
        );
    }
}

export default ShowPoll;
