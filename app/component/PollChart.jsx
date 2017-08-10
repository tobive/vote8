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
            <PieChart width={800} height={400}>
              <Pie data={data} cx={200} cy={200}
                innerRadius={40} outerRadius={90} fill="#ECB588"
                nameKey="name" legendType="rect"
                animationBegin={1000}
                label/>
              <Tooltip/>
            </PieChart>
        );
    }


};

export default PollChart;
