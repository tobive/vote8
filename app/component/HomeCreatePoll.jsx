import React, {Component} from 'react';
import {Link} from 'react-router';

function HomeCreatePoll (props) {
  return(
    <div className="jumbotron">
      <h1>Create Your Own Poll Now!</h1>
      <p className="lead">Put some cool sounding advertisement here. Whatever dude
      </p>
      <p>
        <Link className="btn btn-lg btn-success" to="/create">
          Create Poll
        </Link>
      </p>
    </div>
  );
}

export default HomeCreatePoll;
