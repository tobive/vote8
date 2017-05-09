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
        var obj = {
          _id: 10,
          title: "Who's the prettiest among goddess",
          option: [
            {name: "Uemura Rina"},
            {name: "Kojima Mako"},
            {name: "Murayama Yuiri"}
          ]
        };
        return(
          <div>
            <div>
              {obj.title}
            </div>
            <div key={obj._id} id={obj._id} onChange={this.selectedValue.bind(this)}>
              {obj.option.map(function(opt){
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
            <div>
              <a href="#">View Result</a>
            </div>
          </div>
        );
    }
}

export default Vote;
