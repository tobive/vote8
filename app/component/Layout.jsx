import React, {Component} from 'react';

export class Layout extends Component {
  render() {
    return(
      <html lang="en">
        <head>
          <meta charSet='utf-8'></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          <title>Vote8</title>
          <link rel='stylesheet' href='/styles.css'></link>
        </head>
        <body>
          <div>
            {this.props.children}
          </div>
          <script src='/app.js'></script>
        </body>
      </html>
    );
  }
}

export default Layout;
