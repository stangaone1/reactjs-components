import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';

import Radio from 'views/components/radio/radio';

import './radio-list.scss';

export default class RadioList extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    options: PropTypes.array,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
  };

  static defaultProps = {
    options: [],
    value: '',
    onChange: () => {
    },
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  onChange(id) {
    const {options} = this.props;
    this.props.onChange({value: options[id]});
  }

  renderList(list, value) {
    return list.map((listElement, index) => {
      const className = cx({
        'RadioList-element': true,
        'RadioList-element--selected': listElement === value,
      });
      return (
        <div key={index} className={className} onClick={this.onChange.bind(this, index)}>
          <Radio
            className="Radio--list"
            checked={listElement === value}
            label={listElement}
          />
        </div>
      );
    });
  }

  renderError() {
    const { error } = this.props;
    if (error) {
      return <div className="RadioList-Error">{error}</div>;
    }
  }

  render() {
    const {
      className,
      children,
      options,
      value,
    } = this.props;
    const componentClasses = cx('RadioList', className);

    return (
      <div className={componentClasses}>
        <div className="RadioList-inner">
          {this.renderList(options, value)}
        </div>
        {children}
        {this.renderError()}
      </div>
    );
  }
}
