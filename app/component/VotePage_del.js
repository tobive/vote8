import React, {Component} from 'react';
import ShowPollHandler from './ShowPollHandler';

export class VotePage extends Component {
    render() {
        return(
            <ShowPollHandler poll={this.props.location.state}/>
        );
    }
};

export default VotePage;
