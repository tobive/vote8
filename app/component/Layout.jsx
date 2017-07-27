import React, {Component} from 'react';
//import {Switch, Route} from 'react-router-dom';

export class Layout extends Component {
  render() {
    return(
      <html>
        <head>
          <meta charSet='utf-8' />
          <title>Vote8</title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"></link>
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

// module.exports = React.createClass({
//   displayName: 'Layout',
//
//   render: function render() {
//     console.log("MASUK LAYOUT");
//     return (
//       <html>
//         <head>
//           <meta charSet='utf-8' />
//           <title>Vote8</title>
//           <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"></link>
//           <link rel='stylesheet' href='/styles.css'></link>
//         </head>
//         <body>
//           <div>
//             {this.props.children}
//           </div>
//           <script src='/app.js'></script>
//         </body>
//       </html>
//     );
//   }
// })
