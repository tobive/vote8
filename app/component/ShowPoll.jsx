import React, {Component} from 'react';
import Vote from './Vote.jsx';
import PollChart from './PollChart.jsx';
const URL = process.env.APP_URL || require('../../config/main.js').MAIN_URL;

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
        <section className="graph-container">
          <PollChart options={this.state.poll.options} />
        </section>
      );
    }

    componentDidMount() {
      this.setState({active: true});
    }

    render() {
        let poll = this.state.poll;
        let link = URL + "/vote/" + poll.link;
        let chart = "";
        if(this.state.active) {
          chart = this.renderChart();
        }
        return(
          <main>
            <div className="show-container">
              <section className="poll-show">
                <div className="link-block">{link}</div>
                <Vote obj={poll}/>
              </section>
              {chart}
            </div>
          </main>
        );
    }
}

export default ShowPoll;
