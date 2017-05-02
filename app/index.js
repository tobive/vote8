import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Main from './component/Main';
import CreatePoll from './component/CreatePoll';
import Home from './component/Home';
import Vote from './component/Vote';
//import './index.css';

// ReactDOM.render(
//   <Router history={browserHistory}>
//     <Route path="/" component={Main}>
//       <IndexRoute component={Home}/>
//       <Route path="/create" component={CreatePoll} />
//       <Route path="/vote" component={VotePage}/>
//     </Route>
//   </Router>,
//   document.getElementById('root')
// );

// ReactDOM.render(
//   (<BrowserRouter>
//     <main>
//     <Switch>
//       <Route exact path='/' component={temp}/>
//
//     </Switch>
//     </main>
//   </BrowserRouter>),
//   document.getElementById('root')
// );

const home = () => (
  <div>
  <div>Home</div>
  <div><Link to='/create'>Create</Link></div>
  <div><Link to='/vote'>Vote</Link></div>
  </div>
)
const create = () => (
  <div>Create oi</div>
)
const vote = () => (
  <div>Vote oi</div>
)

window.onload = () => {
  var root = document.createElement('div');
  root.id = 'react-root';
  document.body.appendChild(root);

  render(
    (<BrowserRouter>
      <Main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/create' component={CreatePoll}/>
          <Route path='/vote' component={Vote}/>
        </Switch>
      </Main>
    </BrowserRouter>),
  root);
};
