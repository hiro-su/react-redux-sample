//Container

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

import AlertDialog from '../components/AlertDialog';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

import * as searchActions from '../actions/search';

class SearchShowContainer extends Component {
  constructor(props) {
    super(props);

    this.handleOnClickOkBtn = this.handleOnClickOkBtn.bind(this);
  }

  componentDidMount() {
    this.handleSearchSample();
  }

  handleSearchSample() {
    const { searchActionBind, id } = this.props;
    searchActionBind.searchId(id);
  }

  handleOnClickOkBtn() {
    const { searchActionBind } = this.props;
    searchActionBind.changeAlertMessage("");
  }

  render() {
    const {
      alertMessage,
      searched
    } = this.props;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Link to='/search'>検索画面</Link>
          <AlertDialog
            message={alertMessage}
            onCloseDialog={this.handleOnClickOkBtn}
          />
          <Table>
            <TableBody displayRowCheckBox={false}>
              <TableRow>
                <TableRowColumn>{searched._id}</TableRowColumn>
                <TableRowColumn>{searched.title}</TableRowColumn>
                <TableRowColumn>{searched.created}</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </MuiThemeProvider>
    );
  }
}

// ここに定義するとSearchShowContainerで変数が使えるようになる
const mapStateToProps = (state, ownProps) => {
  const {
    alertMessage,
    searched
  } = state.rootReducer.search;

  return {
    alertMessage,
    searched: searched,
    id: ownProps.params.id
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchActionBind: bindActionCreators(searchActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchShowContainer);
