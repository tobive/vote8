import React, {Component} from 'react';

export class Error404 extends Component {
  render() {
    return(
      <main className="error-page">
        <h1>Page not found.</h1>
        <p>404 :(</p>
      </main>
    );
  }
}

export default Error404;
