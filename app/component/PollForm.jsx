import React, {Component} from 'react';
import OptionFormAdd from './OptionFormAdd.jsx';
import MainContainer from './MainContainer.jsx';

export class PollForm extends Component {
  constructor(props) {
    super(props);
    let title = props.poll.title ? props.poll.title : "";
    let description = props.poll.description ? props.poll.description : "";
    this.state = {
      title: title,
      description: description,
      poll: props.poll ? props.poll : {}
    };
    this.titleChangeHandler = this.titleChangeHandler.bind(this);
    this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
    this.optionsChangeHandler = this.optionsChangeHandler.bind(this);
    this.saveForm = this.saveForm.bind(this);
  }

  titleChangeHandler(event) {
    let newTitle = event.target.value;
    this.setState({
      title: newTitle
    });
  }

  descriptionChangeHandler(event) {
    let newDesc = event.target.value;
    this.setState({
      description: newDesc
    });
  }

  optionsChangeHandler(obj) {
    this.setState({
      options: obj
    });
  }

  saveForm() {
    if(!this.state.title) return false;
    this.props.savePoll(this.state);
  }

  render() {
    var objPoll = this.state.poll.options;
    console.log("INI ISI STATE.options: ", objPoll);
    return(
      <section>
        <div className="input_box container text-center">
          <h2>{this.props.header}</h2>
          <div className="form-horizontal">
            <div className="form-group">
              <label className="col-sm-2 control-label">title</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="title"
                  placeholder="must not empty"
                  value={this.state.title}
                  onChange={this.titleChangeHandler}
                  />
              </div>
              <label className="col-sm-2 control-label">description</label>
              <div className="col-sm-10">
                <textarea className="form-control" rows="3"
                  placeholder="< optional >"
                  id="description"
                  value={this.state.description}
                  onChange={this.descriptionChangeHandler}
                  />
              </div>
              <div className="col-sm-12"><br/></div>
              <label className="col-sm-2 control-label">options</label>
              <OptionFormAdd
                options={this.state.poll.options}
                onChange={this.optionsChangeHandler}
                />
            </div>
          </div>
          <div>
            <button
              className="btn btn-lg btn-success"
              id="saveFormButton"
              onClick={()=>this.saveForm()}
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
  header: "",
  poll: {
    title: "",
    description: "",
    options: []
  }
}

export default PollForm;
