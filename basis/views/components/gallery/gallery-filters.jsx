import React, {Component, PropTypes} from 'react';
import Select from 'views/components/select';
import InputField from 'views/components/inputfield';
import Icon from 'views/components/icon/icon';
import {cloneDeep} from 'lodash';
import './gallery-filters.scss';

export default class GalleryFilters extends Component {
  static propTypes = {
    filters: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      values: PropTypes.arrayOf(PropTypes.string),
    })).isRequired,
    resultsCount: PropTypes.number.isRequired,
    filterValues: PropTypes.arrayOf(PropTypes.string),
    // called with an object of the shape {filterName, value}
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      filterValues: props.filterValues,
    };

    this.resetFilters = this.resetFilters.bind(this);
  }

  getResultsText() {
    return this.props.resultsCount === 1
      ? 'Result'
      : 'Results';
  }

  resetFilters() {
    this.setState({
      filterValues: this.props.filterValues,
    });
  }

  onFilterChange(index, value) {
    const newFilterValues = cloneDeep(this.state.filterValues);
    newFilterValues[index] = value;

    this.setState({
      filterValues: newFilterValues,
    });

    this.props.onChange(this.state.filterValues);
  }

  renderHeader() {
    return (
      <header className="GalleryFilters-header">
        <span className="GalleryFilters-title">Filter Slides</span>
        <span className="GalleryFilters-count">
          {this.props.resultsCount}
          {this.getResultsText()}
        </span>
      </header>
    );
  }

  renderSearchFilter() {
    const searchIcon = <Icon name="search" />;

    return (
      <InputField
        className="GalleryFilters-search"
        placeholder="Search tags"
        iconLeft={searchIcon}
        iconLeftClick={() => {}}
      />
    );
  }

  renderFilters() {
    return (
      <ul className="GalleryFilters-list">
        {this.props.filters.map((filter, index) => {
          const value = this.state.filterValues[index];

          return (
            <li key={filter.name}>
              <Select
                onChange={this.onFilterChange.bind(this, index)}
                value={value.toString()}
              >
                {filter.values.map((option, index) => {
                  return (
                    <option
                      key={index}
                      value={index.toString()}
                    >
                      {option}
                    </option>
                  );
                })}
              </Select>
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    return (
      <div className="GalleryFilters">
        {this.renderHeader()}
        {this.renderSearchFilter()}
        {this.renderFilters()}

        <div className="GalleryFilters-reset">
            <span onClick={this.resetFilters}>reset</span>
        </div>
      </div>
    );
  }
}
