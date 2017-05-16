import React, {Component} from 'react';

function PollPill (props) {
  return(
    <div className="btn-group btn-group-justified">
      <a className="btn btn-default"
        onClick={
          (e) => {e.stopPropagation();
          props.goToPoll(props.linkPoll)}
        }
        >
        {props.title}
      </a>
    </div>
  );
}

export default PollPill;
