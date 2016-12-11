// deps
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

// style
import './page.scss';

const propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
};

const defaultProps = {
  name: null,
};

class Page extends Component {
  render() {
    const { name } = this.props;

    let classNames = null;
    classNames = { 'Page-content': true };

    // add page name as class if any
    if (name) {
      classNames[`Page-${name}`] = true;
    }

    return (
        <div className={cx(classNames)}>
          {this.props.children}
        </div>
    );
  }
}

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;

export default Page;
