import React, {Component} from 'react';
import PollForm from './PollForm.jsx';

export class PollFormController extends Component {
  savePollX(obj) {
    let postObj = Object.assign({}, obj);
    let keys = Object.keys(postObj.options);
    let arrOpt = [];
    for(let i=0; i<keys.length; i++) {
      let objTmp = {
        name: postObj.options[keys[i]]
      };
      arrOpt.push(objTmp);
    }
    postObj.options = arrOpt;
    console.log("received state: ",JSON.stringify(postObj));

    let req = new XMLHttpRequest();
    req.open('POST', 'http://localhost:8000/api/postnew');
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify(postObj));
  }

  render() {
    let empty = {};
    return(
      <PollForm
        header={this.props.header}
        savePoll={this.savePollX}
        options={empty}
        />
    );
  }
}

export default PollFormController;
