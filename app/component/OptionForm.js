import React, {Component} from 'react';

function OptionForm (props) {
  return(
    <div>
      <div className="col-sm-2">
      </div>
      <div className="col-sm-10">
        <div className="input-group">
          <input type="text" className="form-control"
            id={props.idForm} placeholder={props.placeHolder}
            value={props.name}
            onChange={props.handleInputChange}
            />
          <span className="input-group-btn">
            <button
            className="btn btn-danger"
            onClick={
              (e) => {
                e.stopPropagation();
                props.deleteOption(props.idForm);
              }
            }>
              <span className="glyphicon glyphicon-minus"></span>
             </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default OptionForm;
