// Reducer

export default function search(state = {
  searchWord: "",
  isProcessing: false,
  searchedList: [],
  alertMessage: "",
  isAddMode: false,
  poller: true,
  searched: {},
  isDeleted: false
}, action = {}){
  switch( action.type ){
    case 'CHANGE_SEARCH_WORD':
      return Object.assign({}, state, {
        searchWord: action.searchWord,
        isAddMode: false,
        poller: false
      });
    case 'REQUEST_PROCESS':
      return Object.assign({}, state, {
        isProcessing: true,
        poller: action.poller
      });
    case 'SUCCESS_SEARCH':
      let newIsAddMode = true;
      if (state.searchWord.length <= 0) {
        newIsAddMode = false;
      }
      else {
        for (var i = 0;i < action.searchedList.length;i++) {
          if (state.searchWord.toLowerCase() === action.searchedList[i].title.toLowerCase()) {
            newIsAddMode = false;
          }
        }
      }
      const newState = Object.assign({}, state, {
        isProcessing: false,
        searchedList: action.searchedList,
        isAddMode: newIsAddMode,
        poller: action.poller
      });
      if (action.poller) newState.searchWord = '';
      return newState;
    case 'SUCCESS_DELETE':
      return Object.assign({}, state, {
        alertMessage: action.message
      });
    case 'SUCCESS_SEARCH_ID':
      return Object.assign({}, state, {
        searched: action.searched
      });
    case 'FAILED_SEARCH':
      return Object.assign({}, state, {
        isProcessing: false,
        alertMessage: action.message,
        poller: false
      });
    case 'SUCCESS_REGISTAR':
      return Object.assign({}, state, {
        isProcessing: false,
        alertMessage: "登録しました。",
        searchedList: [action.insertData],
        searchWord: "",
        isAddMode: false,
        poller: false
      });
    case 'FAILED_REGISTAR':
      return Object.assign({}, state, {
        isProcessing: false,
        alertMessage: action.message,
        poller: false
      });
    case 'CHANGE_ALERT_MESSAGE':
      return Object.assign({}, state, {
        alertMessage: action.message,
        poller: false
      });
    default:
      return state;
  }
}
