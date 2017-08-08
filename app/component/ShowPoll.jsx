import React, {Component} from 'react';
import Vote from './Vote.jsx';
import PollChart from './PollChart.jsx';

export class ShowPoll extends Component {
    constructor(props) {
        super(props);
        const objPoll = Object.assign({}, this.props.pollServer);
        this.state = {
          poll: objPoll,
          active: false
        };
    }

    renderChart() {
      return (
        <div className="show_right col-sm-6">
          <div className="poll_chart text-center">
            <PollChart options={this.state.poll.options} />
          </div>
        </div>
      );
    }

    componentDidMount() {
      this.setState({active: true});
    }

    render() {
        console.log("INSIDE SHOWPOLL: ", this.props.pollServer);
        let poll = this.state.poll;
        let chart = "";
        if(this.state.active) {
          chart = this.renderChart();
        }
        return(
          <div>
            <div className="row">
              <div className="show_left col-sm-6">
                <div className="poll_box text-center">
                  <Vote obj={poll}/>
                </div>
              </div>
            {chart}
            </div>
          </div>
        );
    }
}

export default ShowPoll;
