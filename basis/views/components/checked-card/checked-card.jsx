import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowEqual from 'fbjs/lib/shallowEqual';

import Checkbox from 'views/components/checkbox';
import Icon from 'views/components/icon';

import './checked-card.scss';

export default class CheckedCard extends Component {
  static propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool,
    id: PropTypes.string,
    subtitle: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.string,
    onChange: PropTypes.func,
    children: PropTypes.node,
  };

  static defaultProps = {
    cardData: {
      checked: false,
    },
    onChange: () => {
    },
  };

  shouldComponentUpdate(nextProps) {
    return !shallowEqual(this.props, nextProps);
  }

  onChangeCheckedCard(id, event) {
    if (event.target.className !== 'Checkbox-simulator' && event.target.className !== 'Checkbox-input') {
      this.props.onChange(id);
    }
  }

  renderIcon(icon, checked) {
    if (icon) {
      const iconClasses = cx('CheckedCard-icon', {
        'CheckedCard-icon--select': checked,
      });
      const iconName = checked ? icon + '.checked' : icon;

      return <Icon className={iconClasses} name={iconName}/>;
    }
  }

  renderTitle(title) {
    if (title) {
      return (<div className="CheckedCard-title">{title}</div>);
    }
  }

  renderSubtitle(subtitle) {
    if (subtitle) {
      return (<div className="CheckedCard-subtitle">{subtitle}</div>);
    }
  }

  render() {
    const {className, checked, title, subtitle, icon, id, onChange, ...props} = this.props;
    const componentClasses = cx('CheckedCard', {
      'CheckedCard--select': checked,
    }, className);

    return (
      <div className={componentClasses} onClick={this.onChangeCheckedCard.bind(this, id)}>
        <Checkbox {...props} className="Checkbox--checkedCard" checked={checked} onChange={onChange.bind(this, id)}/>
        {this.renderIcon(icon, checked)}
        {this.renderTitle(title)}
        {this.renderSubtitle(subtitle)}
        {this.props.children}
      </div>
    );
  }
}
