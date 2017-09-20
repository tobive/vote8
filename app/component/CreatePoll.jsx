import React, {Component} from 'react';
import PollForm from './PollForm.jsx';
const URL = require('../../config/main.js').MAIN_URL;

export class CreatePoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: true
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.savePollX = this.savePollX.bind(this);
  }

  open(success) {
    let overlay = document.querySelector('#create-overlay');
    let info = success ? '#create-success' : '#create-fail';
    let infoModal = document.querySelector(info);
    overlay.style.display = 'block';
    infoModal.classList.toggle('open');
  }

  close(success) {
    let overlay = document.querySelector('#create-overlay');
    let info = success ? '#create-success' : '#create-fail';
    let infoModal = document.querySelector(info);
    infoModal.classList.remove('open');
    overlay.style.display = 'none';
  }

  alertModal(success) {
    let msgSuccess = (
      <div id="create-success" className="info--modal success">
        <p><strong>Successfully created!</strong> redirecting to your page...</p>
      </div>
    );
    let msgFailed = (
      <div id="create-fail" className="info--modal fail">
        <p><strong>Failed to create!</strong> Sorry. There's some problem with server. Please Try Again later</p>
      </div>
    );
    let msg = success ? msgSuccess : msgFailed;
    return msg;
  }

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

    fetch(URL + '/api/postnew', {
      method: 'post',
      headers: new Headers({
        'Content-Type' : 'application/json;charset=UTF-8'
      }),
      body: JSON.stringify(postObj),
      credentials: 'include'
    })
      .then((response) => response.json())
      .then(res => {
        if(res.status == 200) {
          this.setState({ success: true });
          this.open(true);
          setTimeout(() => {
            this.close(true);
            window.location = URL + "/vote/" + res.link;
          }, 2000);
        } else {
          this.open(false);
          setTimeout(() => {
            this.close(false);
          }, 2000)
        }
      });
  }

  render() {
    let empty = {};
    let modal = this.alertModal(this.state.success);
    return(
      <main>
        <div id="create-overlay" className="overlay"></div>
        <PollForm
          header="Create Poll"
          savePoll={this.savePollX}
          options={empty}
          />
          {modal}
      </main>

    );
  }
}

export default CreatePoll;
