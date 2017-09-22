import React, {Component} from 'react';
const URL = process.env.APP_URL || require('../../config/main.js').MAIN_URL;

export class Vote extends Component {
    constructor(props) {
      super(props);
      this.state = {
        ballot: " ",
        disabled: ""
      };
      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
      this.selectedValue = this.selectedValue.bind(this);
      this.submitVote = this.submitVote.bind(this);
    }

    open(success) {
      let overlay = document.querySelector('.overlay');
      if(success) {
        let successModal = document.querySelector('.info--modal.success');
        overlay.style.display = 'block';
        successModal.classList.toggle('open');
      } else {
        let failModal = document.querySelector('.info--modal.fail');
        overlay.style.display = 'block';
        failModal.classList.toggle('open');
      }
    }

    close(success) {
      let overlay = document.querySelector('.overlay');
      if(success) {
        let successModal = document.querySelector('.info--modal.success');
        successModal.classList.remove('open');
        overlay.style.display = 'none';
      } else {
        let failModal = document.querySelector('.info--modal.fail');
        failModal.classList.remove('open');
        overlay.style.display = 'none';
      }
    }

    selectedValue(event) {
        this.setState({
          ballot: event.target.value
        });
    }

    submitVote(ballot) {
      if((!ballot)||(ballot===" ")) return false;
      let obj = {
        _id: this.props.obj._id,
        key: ballot
      };
      fetch(URL + '/api/postvote', {
        method: 'post',
        headers: new Headers({
          'Content-Type' : 'application/json;charset=UTF-8'
        }),
        body: JSON.stringify(obj),
        credentials: 'include'
      })
        .then(res => {
          if(res.status == 200) {//success
            this.setState({disabled: true});
            this.open(true);
            setTimeout(() => {
              this.close(true);
            }, 2000);
          } else {//fail
            this.setState({disabled: ""});
            this.open(false);
            setTimeout(() => {
              this.close(false);
            }, 2000);
          }
        });
    }

    render() {
        let obj = this.props.obj;
        return(
          <form className="poll-form">
            <fieldset>
              <legend>{this.props.legend}</legend>
              <div className="poll-random--title">{obj.title}</div>
              <div className="poll-random--description">{obj.description}</div>
              {obj.options.map((opt) => {
                  return (
                    <div key={opt._id} className="radio">
                      <div className="radio-button--container">
                        <input type="radio" key={opt._id} name="ballot"
                                value={opt._id}
                                checked={this.state.ballot === opt._id}
                                onChange={this.selectedValue.bind(this)}/>
                      </div>
                      <div className="radio-label--container">
                        {opt.name}
                      </div>
                    </div>
                  );
                })
              }
            </fieldset>
              <button
                type="button" className="poll-button"
                disabled={this.state.disabled}
                onClick={() => this.submitVote(this.state.ballot)}>
                Vote!
              </button>
          </form>
        );
    }
}

export default Vote;
