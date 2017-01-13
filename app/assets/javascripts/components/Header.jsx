import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppBar from 'material-ui/AppBar';

const muiTheme = getMuiTheme();

class Header extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
            <header>
              <AppBar
                title='本棚'
              />
            </header>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Header;
