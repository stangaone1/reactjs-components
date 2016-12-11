// deps
import React, { Component, PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node,
};

class Body extends Component {
  render() {
    return (
        <div className="Page-body">
          {this.props.children}
        </div>
    );
  }
}

Body.propTypes = propTypes;

export default Body;
