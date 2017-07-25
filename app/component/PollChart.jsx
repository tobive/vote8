import React, {Component} from 'react';
var PieChart = require('react-chartjs').Bar;

export class PollChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poll: props.poll
        }
    }

    render() {
        console.log("BANGSAT", this.props.poll);
        const dataPoll = this.props.poll;
        if (!dataPoll) return (<div>Failed to Load</div>); //fail-safe
        let valuePoll = dataPoll.map(x => Object.values(x)[0]);
        let labelsPoll = dataPoll.map(x => Object.values(x)[1]);
        const chartData = {
            labels: labelsPoll,
            datasets: [{
                label: "# of Votes",
                data: valuePoll,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        };
        const chartOptions = {
            scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
            }
        };
        return(
            <PieChart data={chartData} options={chartOptions} width="300" height="250" />
        );
    }


};

// PollChart.defaultProps = {

// };

export default PollChart;
