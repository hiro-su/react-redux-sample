import React from 'react';
import { Route, NotFound } from 'react-router';

import App from './components/App';
import HelloWolrd from './components/HelloWorld';
import SearchContainer from './containers/SearchContainer';
import SearchShowContainer from './containers/SearchShowContainer';

export default (store) => {

  return (
    <Route path="/" component={App}>
      <Route path="helloworld" component={HelloWolrd}/>
      <Route path="search" component={SearchContainer}/>
      <Route path="search/:id" component={SearchShowContainer}/>
    </Route>
  );
};
