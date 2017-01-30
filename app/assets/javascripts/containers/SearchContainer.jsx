// Container

import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

import Search from '../components/Search';
import AlertDialog from '../components/AlertDialog';
import RefreshIndicator from '../components/RefreshIndicator';
import AllSearch from '../components/AllSearch';

import * as searchActions from '../actions/search';

class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.handleChangeSearchWord = this.handleChangeSearchWord.bind(this);
    this.handleEnterSearchEdit = this.handleEnterSearchEdit.bind(this);
    this.handleOnClickRegisterBtn = this.handleOnClickRegisterBtn.bind(this);
    this.handleOnClickOkBtn = this.handleOnClickOkBtn.bind(this);
    this.handleOnClickAllSearchBtn = this.handleOnClickAllSearchBtn.bind(this);
  }

  componentDidMount() {
    this.handleOnClickAllSearchBtn();

    this.poller = setInterval(() => {
      const { poller } = this.props;
      if (poller) this.handleOnClickAllSearchBtn();
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.poller);
  }

  handleChangeSearchWord(e){
    const { searchActionBind } = this.props;
    searchActionBind.changeSearchWord(e.target.value);
  }

  handleEnterSearchEdit(e){
    const { searchActionBind } = this.props;
    const ENTER_KEY_CODE = 13;
    if(e.keyCode == ENTER_KEY_CODE){
      searchActionBind.search();
    }
  }

  handleOnClickRegisterBtn(){
    const { searchActionBind } = this.props;
    searchActionBind.registarSearchWord();
  }

  handleOnClickOkBtn(){
    const { searchActionBind } = this.props;
    searchActionBind.changeAlertMessage("");
  }

  handleOnClickAllSearchBtn() {
    const { searchActionBind } = this.props;
    searchActionBind.allSearch();
  }

  render() {
    const {
      searchWord, searchedList, isAddMode,
      isProcessing, alertMessage, poller
    } = this.props;

    return (
      <div>
        <Link to='/helloworld'>helloworld</Link>
        <AllSearch
          onClickAllSearchBtn={this.handleOnClickAllSearchBtn}
        />
        <Search
          searchWord={searchWord}
          searchedList={searchedList}
          isAddMode={isAddMode}
          onChangeSearchWord={this.handleChangeSearchWord}
          enterSearchEdit={this.handleEnterSearchEdit}
          onClickRegisterBtn={this.handleOnClickRegisterBtn}
        />
        <RefreshIndicator
          isLoadingOpen={isProcessing}
        />
        <AlertDialog
          message={alertMessage}
          onCloseDialog={this.handleOnClickOkBtn}
        />
      </div>
    );
  }
};

SearchContainer.propTypes = {
  searchWord: PropTypes.string.isRequired,
  searchedList: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })).isRequired,
  isAddMode: PropTypes.bool.isRequired,
  isProcessing: PropTypes.bool.isRequired,
  alertMessage: PropTypes.string.isRequired
}

function mapStateToProps( state ){
  const {
    searchWord,
    searchedList,
    isAddMode,
    isProcessing,
    alertMessage,
    poller
  } = state.rootReducer.search;
  return {
    searchWord,
    searchedList,
    isAddMode,
    isProcessing,
    alertMessage,
    poller
  };
}

function mapDispatchToProps( dispatch ) {
  return {
    searchActionBind: bindActionCreators(searchActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer);
