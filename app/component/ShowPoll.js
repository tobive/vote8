import React, {Component} from 'react';
import Vote from './Vote';
import PollChart from './PollChart';

export class ShowPoll extends Component {
    constructor(props) {
        super(props);
        const objPoll = props.poll;
        this.state = {
          idPoll: objPoll.id,
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

        var poll = this.props.poll
        return(
          <section>
            <div className="row">
              <div className="show_left col-sm-6">
                <div className="poll_box text-center">
                  <Vote
                    id={poll.id}
                    title={poll.title}
                    options={poll.options}
                    description={poll.description}
                    submitVote={this.submitVote}
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
