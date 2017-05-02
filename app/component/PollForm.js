import React, {Component} from 'react';
import OptionFormAdd from './OptionFormAdd';
import MainContainer from './MainContainer';

export class PollForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.poll.title,
      description: props.poll.description,
      options: {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.optionsChangeHandler = this.optionsChangeHandler.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const id = target.id;
    const value = target.value;
    this.setState({
      [id] : value
    });
  }

  optionsChangeHandler(obj) {
    this.setState({
      options: obj
    }, ()=> console.log("call from PollForm: ",this.state));
  }

  render() {
    var objPoll = this.props.poll;
    var savedPoll = 5;
    return(
      <section>
        <div className="input_box container text-center">
          <h2>{this.props.header}</h2>
          <div className="form-horizontal">
            <div className="form-group">
              <label className="col-sm-2 control-label">title</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="title"
                  placeholder="put the question here"
                  value={
                          this.state["title"] ?
                            this.state["title"] : objPoll.title
                        }
                  onChange={this.handleInputChange}
                  />
              </div>
              <label className="col-sm-2 control-label">description</label>
              <div className="col-sm-10">
                <textarea className="form-control" rows="3"
                  placeholder="< optional >"
                  id="description"
                  value={
                    this.state["description"] ?
                      this.state["description"] : objPoll.description
                  }
                  onChange={this.handleInputChange}
                  />
              </div>
              <div className="col-sm-12"><br/></div>
              <label className="col-sm-2 control-label">options</label>
              <OptionFormAdd
                options={objPoll.options}
                onChange={this.optionsChangeHandler}
                />
            </div>
          </div>
          <div>
            <button
              className="btn btn-lg btn-success"
              id="saveFormButton"
              onClick={()=>this.props.savePoll(this.state)}
              >
              Save
            </button>
          </div>
        </div>
      </section>
    );
  }
}

PollForm.defaultProps = {
  header: "olelelel",
  poll: {
    title: "siapakah",
    description: "ore ore",
    options: [{id: 3,name: "Uemura Rina"},
              {id: 2,name: "Kojima Mako"},
              {id: 6,name: "Murayama Yuiri"}
             ]
  }
}

export default PollForm;
