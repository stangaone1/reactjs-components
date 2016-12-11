// deps
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

class Header extends Component {
  render() {
    const elementClasses = cx('Page-header', this.props.className);
    return (
        <div className={elementClasses}>
          {this.props.children}
        </div>
    );
  }
}

Header.propTypes = propTypes;

export default Header;
