import React, {Component} from 'react';
import ShowPoll from './ShowPoll';

export class ShowPollHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null
        };
        this.castBallot = this.castBallot.bind(this);
    }

    castBallot(obj) {
        console.log("castBallot :",obj);
        var objResult = this.props.poll;
        for (let i=0;i<objResult.options.length;i++) {
          if (objResult.options[i].id==obj.idBallot) {
            if (objResult.options[i].tally) {
              objResult.options[i].tally++;
            } else {
              objResult.options[i].tally = 1;
            }
          }
        }
        this.setState({
          result: objResult.options
        }, ()=> console.log("objResult :",this.state.result));
    }

    render() {
        return(
          <ShowPoll
            poll={this.props.poll}
            submitVote={this.submitVote}
            sendBallot={this.castBallot}
            resultPoll={this.state.result}
            />
        );
    }
}

export default ShowPollHandler;
