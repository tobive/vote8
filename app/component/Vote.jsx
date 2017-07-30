import React, {Component} from 'react';

function VoteLabel (props) {
  return(
    <div className="radio">
      <label>
        <input type="radio" name="ballot" value={props._id} key={props._id} />
        {props.name}
      </label>
    </div>
  );
}

export class Vote extends Component {
    constructor(props) {
      super(props);
      this.state = {
        ballot: null
      };
      this.selectedValue = this.selectedValue.bind(this);
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
      let req = new XMLHttpRequest();
      req.open('POST', 'http://localhost:8000/api/postvote');
      req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      req.send(JSON.stringify(obj));
      console.log("FROM SUBMIT VOTE " + JSON.stringify(obj));
    }

    render() {
        let obj = this.props.obj;
        return(
          <div>
            <div>
              <b>{obj.title}</b>
            </div>
            <div onChange={this.selectedValue.bind(this)}>
              {obj.options.map(function(opt){
                  return <VoteLabel name={opt.name} _id={opt._id}/>
                })
              }
            </div>
            <div>
              <button
                type="button" className="btn btn-sm btn-success"
                onClick={(e)=>{
                  //e.stopPropagation();
                  this.submitVote(this.state.ballot);
                }}>
                Vote!
              </button>
            </div>
          </div>
        );
    }
}

export default Vote;
