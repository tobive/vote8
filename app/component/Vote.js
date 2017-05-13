import React, {Component} from 'react';

function VoteLabel (props) {
  return(
    <div className="radio">
      <label>
        <input type="radio" name="ballot" value={props.name} key={props.name} />
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

    render() {
        let obj = this.props.obj;
        return(
          <div>
            <div>
              {obj.title}
            </div>
            <div key={obj._id} id={obj._id} onChange={this.selectedValue.bind(this)}>
              {obj.options.map(function(opt){
                  return <VoteLabel name={opt.name} key={opt.name}/>
                })
              }
            </div>
            <div>
              <button
                type="button" className="btn btn-sm btn-success"
                onClick={(e)=>{
                  e.stopPropagation();
                  this.props.submitVote(this.state.ballot);
                }}>
                Vote!
              </button>
            </div>
          </div>
        );
    }
}

export default Vote;
