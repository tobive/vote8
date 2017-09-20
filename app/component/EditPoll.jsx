import React, {Component} from 'react';
import PollForm from './PollForm.jsx';
const URL = require('../../config/main.js').MAIN_URL;

export class EditPoll extends Component {
  constructor(props) {
    super(props);
    const objPoll = Object.assign({}, this.props.pollServer);
    this.state = {
      id: objPoll._id,
      poll: objPoll,
      success: true
    };
    this.saveEdited = this.saveEdited.bind(this);
    this.openInfo = this.openInfo.bind(this);
    this.closeInfo = this.closeInfo.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  openInfo(success) {
    let editOverlay = document.querySelector('#edit-overlay');
    let info = success ? '#edit-success' : '#edit-fail';
    let infoModal = document.querySelector(info);
    editOverlay.style.display = 'block';
    infoModal.classList.toggle('open');

  }

  closeInfo(success) {
    let editOverlay = document.querySelector('#edit-overlay');
    let info = success ? '#edit-success' : '#edit-fail';
    let infoSuccess = document.querySelector(info);
    editOverlay.style.display = 'none';
    infoSuccess.classList.remove('open');
  }

  openDialog() {
    let editOverlay = document.querySelector('#edit-overlay');
    let dialog = document.querySelector('#delete-dialog');
    editOverlay.style.display = 'block';
    dialog.classList.toggle('open');
  }

  closeDialog() {
    let editOverlay = document.querySelector('#edit-overlay');
    let dialog = document.querySelector('#delete-dialog');
    dialog.classList.remove('open');
    editOverlay.style.display = 'none';
  }

  alertModal(success) {
    let msgSuccess = (
      <div id="edit-success" className="info--modal success">
        <p><strong>Success!</strong> redirecting to dashboard...</p>
      </div>
    );
    let msgFailed = (
      <div id="edit-fail" className="info--modal fail">
        <p><strong>Failed!</strong> Sorry. There's some problem with server. Please Try Again later</p>
      </div>
    );
    let msg = success ? msgSuccess : msgFailed;
    return msg;
  }

  dialogModal() {
    return (
      <div id="delete-dialog" className="dialog--modal">
        <p>Do you want to delete this poll?</p>
        <div className="dialog-button-container">
          <button onClick={() => this.deletePoll()} className="pill blue-pill">Yes</button>
          <button onClick={this.closeDialog} className="pill red-pill">No</button>
        </div>
      </div>
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

    fetch(URL + '/api/postEdited', {
      method: 'post',
      headers: new Headers({
        'Content-Type' : 'application/json;charset=UTF-8'
      }),
      body: JSON.stringify(sendObj),
      credentials: 'include'
    })
      .then(res => {
        if(res.status == 200) {
          this.setState({ success: true });
          this.openInfo(true);
          setTimeout(() => {
            window.location = URL + '/dashboard';
          }, 2000);
        } else {
          this.setState({ success: false });
          this.openInfo(false);
          setTimeout(() => {
            this.closeInfo(false);
          }, 2000);
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
        if(res.status == 200) {
          this.setState({ success: true });
          this.closeDialog();
          this.openInfo(true);
          setTimeout(() => {
            window.location = URL + '/dashboard';
          }, 2000);
        } else {
          this.setState({ success: false });
          this.openInfo(false);
          setTimeout(() => {
            this.closeInfo(false);
          }, 2000);
        }
      });
  }

  render() {
    let modal = this.alertModal(this.state.success);
    let dialog = this.dialogModal();
    return(
      <main className="edit-container">
        <div id="edit-overlay" className="overlay"></div>
        <div className="edit-header">
          <a href="/dashboard">&lt; back</a>
          <div className="button-delete">
            <button id="deleteButton"
              onClick={this.openDialog}>
              DELETE
            </button>
          </div>
        </div>
        <PollForm header="" poll={this.state.poll} savePoll={this.saveEdited}/>
        {modal}
        {dialog}
      </main>
    );
  }
}

export default EditPoll;
