// deps
import React, { Component, PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node,
};

class Footer extends Component {
  render() {
    return (
        <div className="Page-footer">
          {this.props.children}
        </div>
    );
  }
}

Footer.propTypes = propTypes;

export default Footer;
