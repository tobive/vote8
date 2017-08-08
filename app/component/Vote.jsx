import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';

export class Vote extends Component {
    constructor(props) {
      super(props);
      this.state = {
        ballot: " ",
        disabled: "",
        showModal: false,
        success: true
      };
      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
      this.selectedValue = this.selectedValue.bind(this);
      this.submitVote = this.submitVote.bind(this);
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
          <strong>Voted!</strong> Thank you for voting!
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

    selectedValue(event) {
        console.log("from selectedValue: "+event.target.value);
        this.setState({
          ballot: event.target.value
        });
    }

    submitVote(ballot) {
      let obj = {
        _id: this.props.obj._id,
        key: ballot
      };
      console.log("FROM SUBMIT VOTE " + JSON.stringify(obj));
      fetch('http://localhost:8000/api/postvote', {
        method: 'post',
        headers: new Headers({
          'Content-Type' : 'application/json;charset=UTF-8'
        }),
        body: JSON.stringify(obj),
        credentials: 'include'
      })
        .then(res => {
          console.log(res);
          if(res.status == 200) {
            this.setState({ disabled: true, showModal: true, success: true });
            setTimeout(function() {
              this.setState({ showModal: false });
            }.bind(this), 2000);
          } else {
            this.setState({ disabled: "", showModal: true, success: false });
            setTimeout(function() {
              this.setState({ showModal: false });
            }.bind(this), 2000);
          }
        });
    }

    render() {
        let obj = this.props.obj;
        let modal = this.alertModal(this.state.success);
        return(
          <div>
            <div><b>{obj.title}</b></div>
            <div>{obj.description}</div>
            <div className="rad-container">
              {obj.options.map((opt) => {
                  return (
                    <div className="radio rad-button">
                      <label>
                      <input type="radio" key={opt._id} name="ballot" value={opt._id}
                        checked={this.state.ballot === opt._id}
                        onChange={this.selectedValue.bind(this)}/>
                        {opt.name}
                      </label>
                    </div>
                  );
                })
              }
            </div>
            <div>
              <button
                type="button" className="btn btn-sm btn-success"
                disabled={this.state.disabled}
                onClick={() => this.submitVote(this.state.ballot)}>
                Vote!
              </button>
            </div>
            {modal}
          </div>
        );
    }
}

export default Vote;
