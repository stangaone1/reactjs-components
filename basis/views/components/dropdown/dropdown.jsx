import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import cx from 'classnames';

import NotificationBubble from 'views/components/notification-bubble';

import './dropdown.scss';

// see dropdown.scss
const BUTTON_PADDING = 30;
const BUTTON_BORDER = 1;
const BODY_ARROW = 14;
const ARROW_OFFSET = BUTTON_PADDING / 2 + BODY_ARROW / 2 + BUTTON_BORDER;

export default class Dropdown extends Component {
  static displayName = 'Dropdown';

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
    customBodyStyle: PropTypes.object,
    label: PropTypes.node.isRequired,
    open: PropTypes.bool,
    disabled: PropTypes.bool,
    inverse: PropTypes.bool,
    blockButton: PropTypes.bool,
    onClick: PropTypes.func,
    onClickOutside: PropTypes.func,
    noPadding: PropTypes.bool,
    position: PropTypes.oneOf(['left', 'right', 'center']),
    theme: PropTypes.oneOf(['light', 'dark']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    buttonType: PropTypes.oneOf(['transparent']),
    onNotificationClick: PropTypes.func,
    notificationCount: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  };

  static defaultProps = {
    theme: 'light',
    size: 'medium',
    open: false,
    noPadding: false,
    position: 'left',
  };

  constructor() {
    super();
    this.onDropdownClick = this.onDropdownClick.bind(this);
    this.state = {
      open: false,
      arrowPosition: ARROW_OFFSET,
    };
  }

  componentWillMount() {
    if (this.props.open) {
      this.setState({
        open: this.props.open
      })
    }
  }

  componentDidMount() {
    this.updateArrowPosition();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.state.open) {
      this.setState({
        open: nextProps.open,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  updateArrowPosition() {
    const node = this.refs.button;
    this.setState({
      arrowPosition: (node.offsetWidth - ARROW_OFFSET),
    });
  }

  open() {
    this.setState({
      open: true,
    });
  }

  handleClickOutside(evt) {
    if (this.state.open && this.props.onClick) {
      this.props.onClick(evt);
    }
    this.setState({
      open: false,
    });
  }

  onDropdownClick(evt) {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick(evt);
    }
    this.setState({
      open: !this.state.open,
    });
  }

  renderNotificationBubble() {
    if (this.props.notificationCount) {
      return (
        <NotificationBubble onClick={this.props.onNotificationClick}>
          {this.props.notificationCount}
        </NotificationBubble>
      );
    }
  }

  renderButton() {
    const buttonClass = cx(
      {
        'Dropdown-button': true,
        'Dropdown-button--open': this.state.open,
        'Dropdown-button--disabled': this.props.disabled,
        'Dropdown-button--block': this.props.blockButton,
      },
      this.props.buttonType ? 'Dropdown-button--' + this.props.buttonType : null
    );

    return (
      <button
        type="button"
        className={buttonClass}
        disabled={this.props.disabled}
        ref="button"
        onClick={this.onDropdownClick}>
        {this.props.label}
        {this.renderNotificationBubble()}
      </button>
    );
  }

  renderBody() {
    if (!this.state.open) return null;

    const {size, theme, position, customBodyStyle, inverse} = this.props;
    const bodyClass = cx(
      {
        'Dropdown-body': true,
        'Dropdown-body--padded': !this.props.noPadding,
        'Dropdown-body--inverse': inverse,
      },
      size ? 'Dropdown-body--' + size : null,
      theme ? 'Dropdown-body--' + theme : null,
      position ? 'Dropdown-body--' + position : null
    );

    const style = position === 'left' ? {
      left: this.state.arrowPosition,
    } : {};

    return (
      <div style={customBodyStyle} className={cx(bodyClass)}>
        <div
          className="Dropdown-arrow"
          style={style}
        >
        </div>
        {this.props.children}
      </div>
    );
  }

  render() {
    const {className, blockButton, onClick, ...props} = this.props;
    const componentClass = cx('Dropdown', {
      'Dropdown--hasNotifications': typeof this.props.notificationCount !== 'undefined',
      'Dropdown--block': blockButton,
    }, className);

    return (
      <div {...props} className={componentClass}>
        {this.renderButton()}
        {this.renderBody()}
      </div>
    );
  }
}
