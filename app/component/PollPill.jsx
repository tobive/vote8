import React, {Component} from 'react';
const URL = require('../../config/main.js').MAIN_URL;

function PollPill (props) {
  let link = URL + "/vote/" + props.objPoll.link;

  return(
    <div className="btn-group btn-group-justified">
      <a className="btn btn-default" href={link}>
        {props.objPoll.title}
      </a>
    </div>
  );
}

export default PollPill;
