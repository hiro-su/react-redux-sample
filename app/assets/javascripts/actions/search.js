export function changeSearchWord( searchWord ){
  return {
    type: 'CHANGE_SEARCH_WORD',
    searchWord
  };
}
 
export function search(){
  // TODO: 非同期処理
  return {
    type: 'SUCCESS_SEARCH',
    searchedList: [{ _id: '1', title: 'test' }]
  }
}
 
export function registarSearchWord(){
  // TODO: 非同期処理
  return {
    type: 'SUCCESS_REGISTAR',
    registerData: { _id: '1', title: 'test' }
  }
}
 
export function changeAlertMessage( message ){
  return {
    type: 'CHANGE_ALERT_MESSAGE',
    message
  }
}
