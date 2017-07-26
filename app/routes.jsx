'use strict';

import React from 'react';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';
import Main from './component/Main.jsx';
import CreatePoll from './component/CreatePoll.jsx';
import Home from './component/Home.jsx';
import ShowPoll from './component/ShowPoll.jsx';
import Layout from './component/Layout.jsx';
import Dashboard from './component/Dashboard.jsx';
import Signin from './component/Signin.jsx';
import Error404 from './component/Error404.jsx';

module.exports = (
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <Route component={Main}>
        <IndexRoute component={Home}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/create' component={CreatePoll}/>
        <Route path='/vote' component={ShowPoll}/>
        <Route path='/signin' component={Signin}/>
        <Route path='*' component={Error404}/>
      </Route>
    </Route>
  </Router>
);

// <BrowserRouter>
//   <Layout>
//     <Main>
//       <Switch>
//         <Route exact path='/' component={Home}/>
//         <Route path='/create' component={CreatePoll}/>
//         <Route path='/vote' component={ShowPoll}/>
//       </Switch>
//     </Main>
//   </Layout>
// </BrowserRouter>
