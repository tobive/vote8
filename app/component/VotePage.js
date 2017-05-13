import React, {Component} from 'react';
import ShowPollHandler from './ShowPollHandler';

export class VotePage extends Component {
    render() {
        var obje = {
          _id: 10,
          title: "Who's the prettiest among goddess",
          options: [
            {id: 9, name: "Uemura Rina"},
            {id: 12, name: "Kojima Mako"},
            {id: 10, name: "Murayama Yuiri"}
          ],
          description: "They're all a blessing in this withered world"
        };
        return(
            <ShowPollHandler poll={this.props.location.state}/>
        );
    }
};

export default VotePage;
