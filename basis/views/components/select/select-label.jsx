import React, {Component, PropTypes} from 'react';
import cx from 'classnames';

import Select from './select';

import './select-label.scss';

class SelectLabel extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    value: PropTypes.any,
    multiple: PropTypes.bool,
    options: PropTypes.array,
    disabled: PropTypes.bool,
    placeholder: PropTypes.node,
    label: PropTypes.node,
    onChange: PropTypes.func,
    tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    // other propTypes here
  };

  render() {
    const {className, label} = this.props;
    const remainingProps = Object.assign({}, this.props);

    const selectLabelClasses = cx({
      'SelectLabel': true,
    }, className);

    // remove label from selection box
    delete remainingProps.label;

    return (
      <div className={selectLabelClasses}>
        <label className="SelectLabel-Label">{label}</label>
        <Select className="SelectLabel-Select" {...remainingProps} />
      </div>
    );
  }
}

export default SelectLabel;
