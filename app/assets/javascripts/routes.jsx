import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HelloWolrd from './components/HelloWorld';
import containers from './containers';
import NotFound from './components/NotFound';

export default (
  <Route path="/" component={App}>
    { /* Home (main) route */ }
    <IndexRoute component={containers.Search}/>

    { /* Routes */ }
    <Route path="helloworld" component={HelloWolrd}/>
    <Route path="search" component={containers.Search}/>
    <Route path="search/:id" component={containers.SearchShow}/>

    { /* Catch all route */ }
    <Route path="*" component={NotFound} status={404}/>
  </Route>
);
