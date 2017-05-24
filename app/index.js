import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Main from './component/Main';
import CreatePoll from './component/CreatePoll';
import Home from './component/Home';
import ShowPoll from './component/ShowPoll';
//import './index.css';

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
  root.id = 'root';
  document.body.appendChild(root);

  render(
    (<BrowserRouter>
      <Main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/create' component={CreatePoll}/>
          <Route path='/vote' component={ShowPoll}/>
        </Switch>
      </Main>
    </BrowserRouter>),
  root);
};
