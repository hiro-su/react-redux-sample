export default function search(state = {
  searchWord: "",
  isProcessing: false,
  searchedList: [],
  alertMessage: "",
  isAddMode: false
}, action = {}){
  switch( action.type ){
    case 'CHANGE_SEARCH_WORD':
      return Object.assign({}, state, {
        searchWord: action.searchWord
      });
    case 'SUCCESS_SEARCH':
      return Object.assign({}, state, {
        isProcessing: false,
        searchedList: action.searchedList
      });
    case 'SUCCESS_REGISTAR':
      return Object.assign({}, state, {
        isProcessing: false,
        alertMessage: "登録しました。",
        searchedList: [],
        searchWord:   ""
      });
    case 'CHANGE_ALERT_MESSAGE':
      return Object.assign({}, state, {
       alertMessage: action.message
      });
    default:
      return state;
  }
}
