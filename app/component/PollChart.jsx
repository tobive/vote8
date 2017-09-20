import React, {Component} from 'react';
import { PieChart, Pie, Legend, Tooltip } from 'recharts';

export class PollChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: props.options
        }
    }

    render() {
        let data = [];
        if(this.state.options) {
          let tmp = this.state.options;
          for(let i=0; i<tmp.length; i++) {
            let objtmp = {
              name: tmp[i].name,
              value: tmp[i].tally
            };
            data.push(objtmp);
          }
        }
        return(
            <PieChart width={300} height={400}>
              <Pie data={data} cx={150} cy={150}
                innerRadius={40} outerRadius={90} fill="#333333"
                nameKey="name" legendType="rect"
                animationBegin={1000}
                label/>
              <Tooltip/>
            </PieChart>
        );
    }


};

export default PollChart;
