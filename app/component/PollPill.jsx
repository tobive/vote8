import React, {Component} from 'react';
import {Link} from 'react-router';

function PollPill (props) {
  // function goToVoteLink (link) {
  //   let req = new XMLHttpRequest();
  //   req.open('GET', 'http://localhost:8000/vote/' + link);
  // };
  let link = "/vote/" + props.linkPoll;
  return(
    <div className="btn-group btn-group-justified">
      <Link className="btn btn-default" to={link}>
        {props.title}
      </Link>
    </div>
  );
}

export default PollPill;

// <a className="btn btn-default"
//   onClick={
//     (e) => {e.stopPropagation();
//     props.goToPoll(props.linkPoll)}
//   }
//   >
//   {props.title}
// </a>
