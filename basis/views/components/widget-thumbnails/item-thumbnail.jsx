import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import Icon from 'views/components/icon';
import './item-thumbnail.scss';

export default class extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    iconName: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    const {className, label, iconName, ...props} = this.props;
    const elementClasses = cx('ContentElement', {
      'ContentElement--hasIcon': iconName,
    }, className);
    if (iconName) {
      return (
        <div {...props} className={elementClasses}>
          <div className="ThumbnailHeader">{label}</div>
          <div className="ThumbnailContent">
            <Icon name={iconName}/>
          </div>
        </div>
      );
    }
    return (
      <div {...props} className={elementClasses}>
        <div className="ThumbnailHeader"></div>
        <div className="ThumbnailContent">
          {label}
        </div>
      </div>
    );
  }
}
