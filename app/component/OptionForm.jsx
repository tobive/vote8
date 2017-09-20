import React, {Component} from 'react';

function OptionForm (props) {
  return(
    <div className="option-container">
      <input type="text"
        id={props.idForm}
        placeholder={props.placeHolder}
        value={props.name}
        onChange={props.handleInputChange}
        />
      <button
        type="button"
        className="option-delete"
        onClick={
          (e) => {
            e.stopPropagation();
            props.deleteOption(props.idForm);
          }}>
        <span className="glyphicon glyphicon-minus"></span>
        -
       </button>
    </div>
  );
}

export default OptionForm;
