import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12
};

const component = (props) => {
  return (
    <div>
      <RaisedButton
        label="全検索"
        style={style}
        onClick={props.onClickAllSearchBtn}
      />
    </div>
  )
};

export default component;
