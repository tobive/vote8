import React, {Component} from 'react';
import OptionForm from './OptionForm.jsx';

export class OptionFormAdd extends Component {
  constructor(props) {
    super(props);
    var arrOpt = props.options;
    var tempId = arrOpt.map((opt) => {
      return opt._id;
    });
    var tempName = arrOpt.map((opt) => {
      return opt.name;
    });
    this.state = {
      idCount: tempId.length + 1,
      arrOptionForm: tempId,
      options: tempName
    };
    this.addOption = this.addOption.bind(this);
    this.deleteOption = this.deleteOption.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  addOption() {
    var temp = this.state.arrOptionForm;
    var xy = this.state.idCount;
    // check if id input already exist
    while(temp.indexOf(xy)>-1) {
      xy++;
    };
    temp.push(xy);
    this.setState({
      idCount: xy,
      arrOptionForm: temp
    });
  }

  deleteOption(id) {
    let arrTemp = this.state.arrOptionForm;
    let opt = this.state.options;
    let index = arrTemp.indexOf(id);
    if((index > -1)&&(delete opt[id])) {
       arrTemp.splice(index,1);
    }
    this.setState({
      arrOptionForm: arrTemp
    });
  }

  returnValue(id) {//HELPER
    let arrOpt = this.state.options;
    let value = "";
    for(let i=0;i<arrOpt.length;i++){
      if(arrOpt[i].id===id){
        value = arrOpt[i].name;
      }
    }
    return value;
  }

  handleInputChange(event) {
    const value = event.target.value;
    const _id = event.target.id;
    const optionNew = this.state.options;
    optionNew[_id] = value;
    this.setState({
      options : optionNew
    }, () => this.props.onChange(this.state.options));
  }

  componentDidMount() {
    const arrOptions = this.props.options;
    const objOptions = {};
    for(let i=0;i<arrOptions.length;i++){
      objOptions[arrOptions[i]._id] = arrOptions[i].name;
    }
    this.setState({
      options: objOptions
    }, ()=> this.props.onChange(this.state.options));
  }

  render() {
    var idNow = this.state.idCount;
    var arrPrintedOption = this.state.arrOptionForm;
    var optionProp = this.props.options;
    return(
      <div className="form--options">
        {
          arrPrintedOption.map((x,i) => {
            let value = this.returnValue(x);
            return (
              <OptionForm
               key={x}
               idForm={x} placeHolder={"option " + (i+1)}
               deleteOption={this.deleteOption}
               name={
                  this.state.options[x] ? this.state.options[x] : value
                }
               handleInputChange = {this.handleInputChange}
               />
            );
          })
        }
        <button
          type="button"
          className="edit-option--button"
          onClick={
            this.addOption
          }
          >
          &nbsp;+ Add Option
        </button>
      </div>
    );
  }
}

export default OptionFormAdd;
