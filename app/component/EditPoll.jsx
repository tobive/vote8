import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import PollForm from './PollForm.jsx';
const URL = require('../../config/main.js').MAIN_URL;

export class EditPoll extends Component {
  constructor(props) {
    super(props);
    const objPoll = Object.assign({}, this.props.pollServer);
    console.log("ID Poll ini adalah::: ", this.props.pollServer._id);
    this.state = {
      id: objPoll._id,
      poll: objPoll,
      showModal: false,
      success: true
    };
    this.saveEdited = this.saveEdited.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this.setState({ showModal: true });
  }

  close() {
    this.setState({ showModal: false });
  }

  alertModal(success) {
    let msgSuccess = (
      <div className="alert alert-success">
        <strong>Success!</strong> redirecting to dashboard...
      </div>
    );
    let msgFailed = (
      <div className="alert alert-danger">
        <strong>Failed!</strong> Sorry. There's some problem with server. Please Try Again later
      </div>
    );
    let msg = success ? msgSuccess : msgFailed;
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          {msg}
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    );
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

    fetch(URL + '/api/postEdited', {
      method: 'post',
      headers: new Headers({
        'Content-Type' : 'application/json;charset=UTF-8'
      }),
      body: JSON.stringify(sendObj),
      credentials: 'include'
    })
      .then(res => {
        console.log(res);
        if(res.status == 200) {
          this.setState({ showModal: true, success: true });
          setTimeout(function() {
            this.setState({ showModal: false });
            window.location = URL + '/dashboard';
          }.bind(this), 2000);
        } else {
          this.setState({ showModal: true, success: false });
        }
      });
  }

  deletePoll() {
    let delReq = {};
    delReq.userId = this.props.user._id;
    delReq.pollId = this.state.id;

    fetch(URL + '/api/deletePoll', {
      method: 'post',
      headers: new Headers({
        'Content-Type' : 'application/json;charset=UTF-8'
      }),
      body: JSON.stringify(delReq),
      credentials: 'include'
    })
      .then(res => {
        console.log(res);
        if(res.status == 200) {
          this.setState({ showModal: true, success: true });
          setTimeout(function() {
            this.setState({ showModal: false });
            window.location = URL + '/dashboard';
          }.bind(this), 2000);
        } else {
          this.setState({ showModal: true, success: false });
        }
      });
  }

  render() {
    console.log("EDIT POLL: ", this.state.poll);
    let modal = this.alertModal(this.state.success);
    return(
      <div>
        <div>
          <button className="btn btn-danger" id="deleteButton"
            onClick={() => this.deletePoll()}>
            DELETE
          </button>
        </div>
        <div>
          <PollForm header="Edit Poll" poll={this.state.poll} savePoll={this.saveEdited}/>
        </div>
        {modal}
      </div>
    );
  }
}

export default EditPoll;
