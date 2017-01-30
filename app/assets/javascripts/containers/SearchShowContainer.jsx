//Container

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';

import AlertDialog from '../components/AlertDialog';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

import * as searchActions from '../actions/search';
class SearchShowContainer extends Component { constructor(props) {
    super(props);

    this.handleOnClickOkBtn = this.handleOnClickOkBtn.bind(this);
    this.handleOnClickDeleteBtn = this.handleOnClickDeleteBtn.bind(this);
  }

  componentWillMount() {
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

  handleOnClickDeleteBtn() {
    const { searchActionBind, id } = this.props;
    searchActionBind.deleteSample(id);
  }

  render() {
    const {
      alertMessage,
      searched
    } = this.props;

    return (
      <div>
        <Link to='/search'>検索画面</Link>
        <AlertDialog
          message={alertMessage}
          onCloseDialog={this.handleOnClickOkBtn}
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>タイトル</TableHeaderColumn>
              <TableHeaderColumn>作成日時</TableHeaderColumn>
              <TableHeaderColumn>操作</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckBox={false}>
            <TableRow>
              <TableRowColumn>{searched._id}</TableRowColumn>
              <TableRowColumn>{searched.title}</TableRowColumn>
              <TableRowColumn>{searched.created}</TableRowColumn>
              <TableRowColumn>
                <RaisedButton
                  label="削除"
                  secondary={true}
                  onClick={this.handleOnClickDeleteBtn}
                />
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
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
