import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';

import Checkbox from 'views/components/checkbox/checkbox.jsx';

import './checkbox-expandable.scss';

export default class CheckboxExpandable extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    field: PropTypes.object,
    checked: PropTypes.bool,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  renderChildren(children, checked) {
    if (checked) {
      return children;
    }
  }

  render() {
    const {className, children, field, checked, label, title, subTitle, ...props} = this.props;

    const componentClasses = cx('CheckboxExpandable', {
      'CheckboxExpandable--expanded': checked,
    }, className);

    return (
      <div className={componentClasses} {...props}>
        <div className="CheckboxExpandable-title">{title}</div>
        <div className="CheckboxExpandable-subtitle">{subTitle}</div>
        <Checkbox
          {...field}
          label={label}
          className="Checkbox--expandableElement"
        />
        {this.renderChildren(children, checked)}
      </div>
    );
  }
}
