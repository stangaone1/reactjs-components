import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';
import CheckboxPermission from 'views/components/checkbox-permission';

import './permission-comments.scss';

export default class PermissionComments extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleToggle() {
    if (this.props.onChange) {
      this.props.onChange(this.props.value ? false : {registeredOnly: false, approval: false});
    }
  }

  handleChange(option) {
    if (this.props.onChange) {
      if (option === 0) {
        this.props.onChange({...this.props.value, registeredOnly: !this.props.value.registeredOnly});
      } else {
        this.props.onChange({...this.props.value, approval: !this.props.value.approval});
      }
    }
  }

  render() {
    const {className, value, onChange, children, disabled, ...props} = this.props;
    const componentClasses = cx('PermissionComments', {
      // modifiers here
    }, className);
    const optionList = [
      {name: 'From registered users only', checked: value && value.registeredOnly},
      {name: 'Comments must be approved first', checked: value && value.approval},
    ];

    return (
      <div {...props} className={componentClasses}>
        <CheckboxPermission
          label="Allow user comments"
          checked={!!value}
          disabled={disabled}
          options={optionList}
          onToggle={this.handleToggle.bind(this)}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }
}

