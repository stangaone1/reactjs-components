import React, { Component, PropTypes } from 'react';

class SvgIcon extends Component {
  render() {
    return (
        <svg
          className = {this.props.className}
          viewBox = {this.props.viewBox}
          dangerouslySetInnerHTML={{
            __html: '<use xlink:href="' + this.props.icon + '" style="pointer-events: none;" />',
          }} />
    );
  }
}

SvgIcon.displayName = 'SvgIcon';
SvgIcon.propTypes = {
  className: PropTypes.string,
  viewBox: PropTypes.string,
  icon: PropTypes.string,
};
SvgIcon.defaultProps = {
  className: '',
  viewBox: '0 0 20 20',
  icon: '',
};

export default SvgIcon;
