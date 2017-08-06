import React, {Component} from 'react';
import PollForm from './PollForm.jsx';

export class EditPoll extends Component {
  constructor(props) {
    super(props);
    const objPoll = Object.assign({}, this.props.pollServer);
    console.log("ID Poll ini adalah::: ", this.props.pollServer._id);
    this.state = {
      id: objPoll._id,
      poll: objPoll
    };
    this.saveEdited = this.saveEdited.bind(this);
  }

  saveEdited(obj) {
    let sendObj = {};
    sendObj.userId = this.props.user._id;
    sendObj.pollId = this.state.id;
    sendObj.editedObj = {};
    sendObj.editedObj.title = obj.title;
    sendObj.editedObj.description = obj.description;
    let optionsTmp = [];
    let i;
    for(i in obj.options) {
      let tmp = {name: obj.options[i]};
      optionsTmp.push(tmp);
    }
    sendObj.editedObj.options = optionsTmp;
    console.log("saveEdited is sendobj: ", sendObj);

    let req = new XMLHttpRequest();
    req.open('POST', 'http://localhost:8000/api/postEdited');
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify(sendObj));
  }

  render() {
    console.log("EDIT POLL: ", this.state.poll);
    return(
      <PollForm header="Edit Poll" poll={this.state.poll} savePoll={this.saveEdited}/>
    );
  }
}

export default EditPoll;
