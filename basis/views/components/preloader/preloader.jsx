// deps
import React, { Component, PropTypes } from 'react';
import { Button } from 'views/components/buttons';
import Icon from 'views/components/icon';

// style
import './preloader.scss';

const propTypes = {
  busy: PropTypes.bool,
  title: PropTypes.string,
  pending: PropTypes.string,

  onClick: PropTypes.func,
  icon: PropTypes.string,
};

const defaultProps = {
  busy: false,
  title: 'Save changes',
  pending: 'Saving changes...',

  icon: 'preload',
};

class Preloader extends Component {
  getIcon() {
    const icon = (<Icon className="Preloader-icon" name={this.props.icon} />);
    return icon;
  }

  // get status message & icon
  getStatus() {
    const { busy, title, pending } = this.props;

    const status = busy ? pending : title;
    const icon = busy ? this.getIcon() : null;

    return {
      message: status,
      icon: icon,
    };
  }

  render() {
    const status = this.getStatus();
    const { title, pending, icon, ...otherProps } = this.props;

    return (
      <Button className="Preloader" {...otherProps}>
        {status.message}{status.icon}
      </Button>
    );
  }
}

Preloader.propTypes = propTypes;
Preloader.defaultProps = defaultProps;

export default Preloader;
