import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Notification from 'views/components/notification';
import {clearError} from 'store/page-transition.reducer';

import './server-error.scss';

function mapStateToProps(state) {
  return {
    pageTransition: state.pageTransition,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({clearError}, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ServerError extends Component {
  static propTypes = {
    pageTransition: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(...args) {
    super(...args);

    this.onClose = this.onClose.bind(this);
    this.onRefreshClick = this.onRefreshClick.bind(this);
  }

  onClose() {
    this.props.actions.clearError();
  }

  onRefreshClick() {
    window.location.reload();
  }

  render() {
    const {error} = this.props.pageTransition;

    return error
      ? <Notification type="warning" className="ServerError"
          onCloseClick={this.onClose}>
          <span>{error} &nbsp; <a href="" onClick={this.onRefreshClick}>Refresh now</a></span>
        </Notification>
      : <div/>;
  }
}
