import React, {Component, PropTypes} from 'react';

import cx from 'classnames';
import Icon from 'views/components/icon';

import './tag.scss';

export default class Tag extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    removable: PropTypes.bool,
    onRemove: PropTypes.func,
  };

  constructor(...args) {
    super(...args);

    this.onIconClick = this.onIconClick.bind(this);
  }

  onIconClick() {
    if (this.props.removable) {
      this.props.onRemove();
    }
  }

  render() {
    const {text, removable} = this.props;
    const tagIconName = removable
      ? 'close'
      : 'check';

    return (
      <span className={cx('Tag', {'Tag-removable': removable})}>
        <Icon name={tagIconName} onClick={this.onIconClick} />
        {text}
      </span>
    );
  }
}
