import React, {Component} from 'react';
const URL = require('../../config/main.js').MAIN_URL;

function PollPill (props) {
  let link = URL + "/vote/" + props.objPoll.link;

  return(
    <li className="poll-latest--item">
      <a href={link}>
        {props.objPoll.title}
      </a>
    </li>
  );
}

export default PollPill;
