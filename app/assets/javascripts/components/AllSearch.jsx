import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12
};

const component = (props) => {
  return (
    <RaisedButton
      label="全検索"
      style={style}
      onClick={props.onClickAllSearchBtn}
    />
  )
};

export default component;
