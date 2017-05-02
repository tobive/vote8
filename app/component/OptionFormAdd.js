import React, {Component} from 'react';
import OptionForm from './OptionForm';

export class OptionFormAdd extends Component {
  constructor(props) {
    super(props);
    var arrOpt = props.options;
    var temp = arrOpt.map((opt,i) => {
      return opt.id;
    });
    this.state = {
      idCount: temp.length + 1,
      arrOptionForm: temp,
      options: {}
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
    const target = event.target;
    const value = target.value;
    const id = target.id;
    const optionNew = this.state.options;
    optionNew[id] = value;
    this.setState({
      options : optionNew
    }, () => this.props.onChange(this.state.options));
  }

  componentDidMount() {
    const arrOptions = this.props.options;
    const objOptions = {};
    for(let i=0;i<arrOptions.length;i++){
      objOptions[arrOptions[i].id] = arrOptions[i].name;
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
      <div>
        {
          arrPrintedOption.map((x,i) => {
            let value = this.returnValue(x);
            return (
              <OptionForm
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
        <div className="col-sm-2"></div>
        <div className="col-sm-10">
          <button
            className="form-control btn btn-warning"
            onClick={
              this.addOption
            }
            >
            <span className="glyphicon glyphicon-plus"></span>
            &nbsp; Add Option
          </button>
        </div>
      </div>
    );
  }
}

export default OptionFormAdd;
