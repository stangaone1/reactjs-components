import React, { Component, PropTypes } from 'react';
import ReactModal from 'react-modal';
import Icon from 'views/components/icon';
import shallowCompare from 'react-addons-shallow-compare';
import cx from 'classnames';
import './modal.scss';

export default class Modal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    children: PropTypes.node.isRequired,
    size: PropTypes.oneOf(['small', 'extra-small', 'large', 'extra-large']),
    padded: PropTypes.bool,
    className: PropTypes.string,
    noCloseButton: PropTypes.bool,
    noOverlayClick: PropTypes.bool,
  };

  static defaultProps = {
    isOpen: false,
  };

  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return shallowCompare(this, nextProps);
  }

  handleClose() {
    if (!this.props.noOverlayClick) {
      this.props.onClose();
    }
  }

  renderCloseButton(noCloseButton, onClose) {
    if (!noCloseButton) {
      return (
        <button type="button" className="Modal-close" onClick={onClose}>
          <Icon name="close"/>
        </button>
      );
    }
  }

  render() {
    const {
      isOpen,
      onClose,
      noCloseButton,
      children,
      size,
      padded,
      className } = this.props;

    const modalClasses = cx(
      'Modal',
      className,
      size ? 'Modal--' + size : null,
      {'Modal--padded': padded});

    return (
      <ReactModal
        className={modalClasses}
        overlayClassName="Modal-overlay"
        isOpen={isOpen}
        onRequestClose={this.handleClose}
      >
        <div className="Modal-content">
          {this.renderCloseButton(noCloseButton, onClose)}
          {children}
        </div>
      </ReactModal>
    );
  }
}
