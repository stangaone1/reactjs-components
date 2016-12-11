import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';

import './card.scss';

export default class Card extends Component {
  static propTypes = {
    className: PropTypes.string,
    heading: PropTypes.string,
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['warning']),
  };

  shouldComponentUpdate(nextProps) {
    return shallowCompare(this, nextProps);
  }

  renderTitle() {
    if (this.props.heading) {
      return (
        <div className="Card-heading">
          {this.props.heading}
        </div>
      );
    }
  }

  render() {
    const {className, type, children, ...props} = this.props;
    const componentClasses = cx('Card', {
      ['Card--' + type]: type,
    }, className);

    return (
      <div className={componentClasses} {...props}>
        {this.renderTitle()}
        {children}
      </div>
    );
  }
}
