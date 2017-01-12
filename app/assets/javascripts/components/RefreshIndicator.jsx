import React, { PropTypes } from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const style = {
  container: {
    position: 'relative'
  },
  refresh: {
    display: 'inline-block',
    position: 'relative'
  }
}

const component = ({
  isLoadingOpen
}) => {
  return(
    <div style={style.container}>
      <RefreshIndicator
        size={40}
        left={10}
        top={0}
        status={isLoadingOpen ? 'loading' : 'hide'}
        style={style.refresh}
      />
    </div>
  )
}

component.propTypes = {
  isLoadingOpen: PropTypes.bool.isRequired
}

export default component;
