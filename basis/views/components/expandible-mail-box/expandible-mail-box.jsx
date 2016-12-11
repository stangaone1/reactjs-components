import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';

import './expandible-mail-box.scss';

export default class ExpandibleMailBox extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    title: PropTypes.string,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    title: '',
  };

  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
    this.onExpand = this.onExpand.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  onExpand() {
    this.setState({
      isOpen: !this.state.isOpen,
    }, () => {
      if (this.props.onClick) {
        this.props.onClick(this.state.isOpen);
      }
    });
  }

  render() {
    const {className, children, ...props} = this.props;
    const componentClasses = cx('ExpandibleMailBox', {
      'ExpandibleMailBox--expanded': this.state.isOpen,
    }, className);

    return (
      <div className={componentClasses} onClick={this.onExpand} {...props}>
        <div className="ExpandibleMailBox-title">
          {this.props.title}
        </div>
        <div className="ExpandibleMailBox-content">
          {children}
        </div>
      </div>
    );
  }
}

