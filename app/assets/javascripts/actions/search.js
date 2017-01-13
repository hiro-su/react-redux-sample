// action

import request from 'axios';

export function changeSearchWord( searchWord ){
  return {
    type: 'CHANGE_SEARCH_WORD',
    searchWord
  };
}

export function requestProcess() {
  return { type: 'REQUEST_PROCESS' };
}

export function search(){
  return ( dispatch, getState ) => {
    dispatch( { type: 'REQUEST_PROCESS' } );
    const searchWord = getState().rootReducer.search.searchWord;
    return makeRequest('/find', 'post', { searchWord })
      .then(response => {
        if (response.status === 200) {
          return dispatch({
                    type: 'SUCCESS_SEARCH',
                    searchedList: response.data.sampleList
                  });
        }
        else {
          return dispatch({
                    type: 'FAILED_SEARCH',
                    message: "検索に失敗しました。"
                  });
        }
      })
      .catch(() => {
          return dispatch({
                    type: 'FAILED_SEARCH',
                    message: "検索に失敗しました。"
                  });
      });
  };
}

export function searchId(id) {
  return (dispatch, getState) => {
    return makeRequest('/find/' + id, 'post')
      .then(response => {
        if (response.status === 200) {
          return dispatch({
            type: 'SUCCESS_SEARCH_ID',
            searched: response.data
          });
        } else {
          return dispatch({
               type: 'FAILED_SEARCH',
               message: "検索に失敗しました。"
             });
        }
      });
  };
}

export function allSearch() {
  const searchWord = "";
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_PROCESS', poller: true });
    return makeRequest('/find', 'post', { searchWord })
      .then(response => {
        if (response.status === 200) {
          return dispatch({
            type: 'SUCCESS_SEARCH',
            searchedList: response.data.sampleList,
            poller: true
          });
        }
      })
  }
}

export function registarSearchWord(){
  return ( dispatch, getState ) => {
    dispatch( { type: 'REQUEST_PROCESS' } );

    const searchWord = getState().rootReducer.search.searchWord;
    return makeRequest('/add', 'post', { title: searchWord })
      .then(response => {
        if (response.status === 200) {
          return dispatch({
                    type: 'SUCCESS_REGISTAR',
                    insertData: response.data.insertData
                  });
        }
        else {
          return dispatch({
                    type: 'FAILED_REGISTAR',
                    message: "登録に失敗しました。"
                  });
        }
      })
      .catch(() => {
          return dispatch({
                    type: 'FAILED_REGISTAR',
                    message: "登録に失敗しました。"
                  });
      });
  };
}

export function changeAlertMessage( message ){
  return {
    type: 'CHANGE_ALERT_MESSAGE',
    message
  }
}

function makeRequest(url, method, data) {
  return request({
    url,
    method,
    data
  });
}
