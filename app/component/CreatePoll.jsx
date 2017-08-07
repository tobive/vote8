import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import PollForm from './PollForm.jsx';

export class CreatePoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      success: true
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.savePollX = this.savePollX.bind(this);
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
        <strong>Successfully created!</strong> redirecting to your page...
      </div>
    );
    let msgFailed = (
      <div className="alert alert-danger">
        <strong>Failed to create!</strong> Sorry. There's some problem with server. Please Try Again later
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

    // let req = new XMLHttpRequest();
    // req.open('POST', 'http://localhost:8000/api/postnew');
    // req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // req.send(JSON.stringify(postObj));
    fetch('http://localhost:8000/api/postnew', {
      method: 'post',
      headers: new Headers({
        'Content-Type' : 'application/json;charset=UTF-8'
      }),
      body: JSON.stringify(postObj),
      credentials: 'include'
    })
      .then(res => {
        console.log(res);
        if(res.status == 200) {
          //window.location = 'http://localhost:8000/';
          this.setState({ showModal: true, success: true });
          setTimeout(function() {
            this.setState({ showModal: false });
            window.location = 'http://localhost:8000/';
          }.bind(this), 2000);
        } else {
          this.setState({ showModal: true, success: false });          
        }
      });
  }

  render() {
    let empty = {};
    let modal = this.alertModal(this.state.success);
    return(
      <div>
      <PollForm
        header="Create Poll"
        savePoll={this.savePollX}
        options={empty}
        />
        {modal}
      </div>

    );
  }
}

export default CreatePoll;
