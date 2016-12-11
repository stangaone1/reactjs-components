import React, {Component, PropTypes} from 'react';
import './slides-filters.scss';

export default class SlidesFilters extends Component {
  _getResultsText() {
    return this.props.resultsCount === 1
      ? 'Result'
      : 'Results';
  }

  render() {
    return (
      <div className="SlidesFilters">
        <header className="SlidesFilters-header">
          <h5 className="SlidesFilters-title">Filter Slides</h5>
          <span>{this.props.resultsCount} {this._getResultsText()}</span>
        </header>
        <ul className="SlidesFilters-list">
          {this.props.filters.map((filter) => {
            return (
              <li key={filter.name}>
                <span>{filter.name}</span>
                <div>
                  <select onChange={(e) => {
                    this.props.onChange({
                      filterName: filter.name,
                      value: e.target.value,
                    });
                  }}
                      className="SlidesFilters-filter-values">
                    {filter.values.map((option) => {
                      return <option key={option}>{option}</option>;
                    })}
                  </select>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

SlidesFilters.displayName = 'SlidesFilters';

SlidesFilters.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  resultsCount: PropTypes.number.isRequired,
  // called with an object of the shape {filterName, value}
  onChange: PropTypes.func.isRequired,
};

SlidesFilters.defaultProps = {};
