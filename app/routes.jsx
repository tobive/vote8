'use strict';

import React from 'react';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';
import Main from './component/Main.jsx';
import CreatePoll from './component/CreatePoll.jsx';
import Home from './component/Home.jsx';
import ShowPoll from './component/ShowPoll.jsx';
import Layout from './component/Layout.jsx';

module.exports = (
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <Route component={Main}>
        <IndexRoute path='/' component={Home}/>
        <Route path='/create' component={CreatePoll}/>
        <Route path='/vote' component={ShowPoll}/>
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
