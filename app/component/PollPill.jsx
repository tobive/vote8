import React, {Component} from 'react';
import {Link} from 'react-router';

function PollPill (props) {
  let link = "http://localhost:8000/vote/" + props.objPoll.link;
  let newTo = {
    pathname: link
  };
  return(
    <div className="btn-group btn-group-justified">
      <a className="btn btn-default" href={link}>
        {props.objPoll.title}
      </a>
    </div>
  );
}

export default PollPill;
