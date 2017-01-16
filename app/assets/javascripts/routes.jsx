import React from 'react';
import { Route, NotFound, IndexRoute } from 'react-router';

import App from './components/App';
import HelloWolrd from './components/HelloWorld';
import SearchContainer from './containers/SearchContainer';
import SearchShowContainer from './containers/SearchShowContainer';

export default (store) => {

  return (
    <Route path="/" component={App}>
      <IndexRoute component={SearchContainer}/>
      <Route path="helloworld" component={HelloWolrd}/>
      <Route path="search" component={SearchContainer}/>
      <Route path="search/:id" component={SearchShowContainer}/>
    </Route>
  );
};
