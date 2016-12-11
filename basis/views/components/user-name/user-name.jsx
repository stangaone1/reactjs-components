import React, {Component, PropTypes} from 'react';
import cx from 'classnames';

import './user-name.scss';

export default class UserName extends Component {
  static propTypes = {
    className: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.name,
    }),
  };

  // @TODO: link to user must be replace with the correct link
  render() {
    const {className, ...props} = this.props;
    return (
      <a href="#" {...props} className={cx('UserName', className)}>
        {this.props.user.name}
      </a>
    );
  }
}
