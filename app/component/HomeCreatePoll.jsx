import React, {Component} from 'react';
import {Link} from 'react-router';

function HomeCreatePoll (props) {
  return(
    <section className="hero">
      <div className="hero--article">
        <h2>Create Your Own Poll Now!</h2>
        <p>Join today with the latest voting application powered by React and Node JS.
            'So what's so great about it', you said?
            Well, it's React JS. Everyone's talking about it nowadays.
            I know you don't need that for such simple app, but still. It's React.
        </p>
        <p>
          Put cool sounding advertisement here
        </p>
      </div>
      <Link to="/create">
        <div className="hero-button">
          Create Poll
        </div>
      </Link>
    </section>
  );
}

export default HomeCreatePoll;
