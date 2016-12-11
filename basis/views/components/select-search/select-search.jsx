import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import listensToClickOutside from 'react-click-outside';

import Icon from 'views/components/icon';
import Tag from 'views/components/tag';

import './select-search.scss';

@listensToClickOutside
export default class SelectSearch extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.any,
      }),
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.any,
        })).isRequired,
      }),
    ])).isRequired,
    value: PropTypes.array,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    value: [],
    placeholder: 'Select...',
  };

  constructor(...args) {
    super(...args);

    this.state = {
      searchText: '',
      isOpen: false,
    };

    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.onSearchTextFocus = this.onSearchTextFocus.bind(this);
    this.renderOption = this.renderOption.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
  }

  handleClickOutside() {
    this.setState({
      isOpen: false,
    });
  }

  onSearchButtonClick() {
    const isOpen = !this.state.isOpen;

    this.setState({
      isOpen,
    });

    if (isOpen) {
      this.refs.input.focus();
    }
  }

  onSearchTextChange(e) {
    this.setState({
      searchText: e.target.value,
    });
  }

  onSearchTextFocus() {
    this.setState({
      isOpen: true,
    });
  }

  onSearchTextClick(e) {
    e.stopPropagation();
  }

  onValueRemove(val) {
    const {value, onChange} = this.props;
    const index = value.indexOf(val);

    onChange([...value.slice(0, index), ...value.slice(index + 1)]);
  }

  onSelectOption(val, e) {
    const {value, onChange} = this.props;

    e.stopPropagation();

    onChange([...value, val]);
  }

  getFilteredOptions(options) {
    const filteredOptions = [];
    const searchText = this.state.searchText.toUpperCase();

    options.forEach(o => {
      if (o.options) {
        const filteredSubOptions = this.getFilteredOptions(o.options);

        if (filteredSubOptions.length) {
          filteredOptions.push({
            label: o.label,
            options: filteredSubOptions,
          });
        }
      } else if (!this.props.value.includes(o.value)
          && o.label.toUpperCase().includes(searchText)) {
        filteredOptions.push(o);
      }
    });

    return filteredOptions;
  }

  getValueOption(options, val) {
    let valueOption;

    options.some(option => {
      if (option.options) {
        const groupOption = this.getValueOption(option.options, val);

        if (groupOption) {
          valueOption = groupOption;
          return true;
        }
      } else if (option.value === val) {
        valueOption = option;
        return true;
      }
    });

    return valueOption;
  }

  renderOption(option) {
    if (option.options) {
      return (<li className="SelectSearch-optionGroup" key={option.label}>
        <span>{option.label}</span>
        {this.renderOptions(option.options)}
      </li>);
    }

    return <li key={option.value} onClick={this.onSelectOption.bind(this, option.value)}>{option.label}</li>;
  }

  renderOptions(options) {
    if (!options.length) { return null;}

    return (<ul>
      {options.map(this.renderOption)}
    </ul>);
  }

  renderFilteredOptions() {
    const options = this.getFilteredOptions(this.props.options);

    if (!options.length) {
      return <div className="SelectSearch--noOptions">No options</div>;
    }

    return this.renderOptions(options);
  }

  renderSelectedValues() {
    const {value, options} = this.props;

    if (!value.length) { return null; }

    const selectedOptions = value
      .map(v => this.getValueOption(options, v))
      .filter(option => !!option);

    return (
      <div className="SelectSearch-values">
        {selectedOptions.map((option, i) => {
          return (<Tag
            key={i}
            text={option.label}
            removable
            onRemove={this.onValueRemove.bind(this, option.value)} />);
        })}
      </div>
    );
  }

  render() {
    return (
      <div className={cx('SelectSearch', {'SelectSearch--open': this.state.isOpen})}>
        <div className="SelectSearch-select">
          <div className="Select-InputLabel" onClick={this.onSearchButtonClick}>
            <Icon name="search" />
            <span className="Select-InputLabel-Arrow"></span>
            <input
              placeholder={this.props.placeholder}
              value={this.state.searchText}
              onChange={this.onSearchTextChange}
              onClick={this.onSearchTextClick}
              onFocus={this.onSearchTextFocus}
              ref="input" />
          </div>
          <div className="SelectSearch-options">
            {this.renderFilteredOptions()}
          </div>
        </div>
        {this.renderSelectedValues()}
      </div>
    );
  }
}
