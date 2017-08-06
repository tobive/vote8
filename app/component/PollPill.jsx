import React, {Component} from 'react';
import {Link} from 'react-router';

function PollPill (props) {
  let link = "/vote/" + props.objPoll.link;
  let newTo = {
    pathname: link
  };
  return(
    <div className="btn-group btn-group-justified">
      <Link className="btn btn-default" to={newTo}>
        {props.objPoll.title}
      </Link>
    </div>
  );
}

export default PollPill;
