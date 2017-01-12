import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class HelloWorld extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Hello World
        <Link to="/search">search</Link>
      </div>
    );
  }
};

export default HelloWorld;
