import React from 'react';
import { Route } from 'react-router';
 
import App from './components/App';
import HelloWolrd from './components/HelloWorld';
import SearchContainer from './containers/SearchContainer';
 
export default (store) => {
 
  return (
    <Route path="/" component={App}>
      <Route path="helloworld" component={HelloWolrd}/>
      <Route path="search" component={SearchContainer}/>
    </Route>
  );
};
