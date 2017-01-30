import React, { PropTypes } from 'react';

import AppBar from 'material-ui/AppBar';

class Header extends React.Component {
  render() {
    return (
      <header>
        <AppBar
          title='本棚'
        />
      </header>
    );
  }
}

export default Header;
