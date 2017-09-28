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
    return(
      <div className="create-form--container">
        <h1>{this.props.header}</h1>
        <form>
          <div className="form-row">
            <label htmlFor="title" className="form-label">title</label>
            <input id="title" name="title"
                  type="text" placeholder="<must not empty>"
                  value={this.state.title}
                  onChange={this.titleChangeHandler}/>
          </div>
          <div className="form-row">
            <label htmlFor="description" className="form-label">description</label>
            <textarea id="description" name="description"
                      rows="3" placeholder="<optional>"
                      value={this.state.description}
                      onChange={this.descriptionChangeHandler}
                      />
          </div>
          <div className="form-row">
            <label htmlFor="options" className="form-label">options</label>
            <OptionFormAdd
              options={this.state.poll.options}
              onChange={this.optionsChangeHandler}
              />
          </div>
        </form>
        <div className="button-create">
          <button id="saveFormButton" onClick={()=>this.saveForm()}>
            Save
          </button>
        </div>
      </div>
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
