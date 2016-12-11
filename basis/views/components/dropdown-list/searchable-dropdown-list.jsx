import React, { Component, PropTypes } from 'react';
import DropdownListSearch from './dropdown-list-search';
import DropdownList from './dropdown-list';
import shallowCompare from 'react-addons-shallow-compare';

export default class SearchableDropdownList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    selectedItemId: PropTypes.number,
    onFetchMore: PropTypes.func,
    onSearch: PropTypes.func,
    onSelectItem: PropTypes.func,
    hasMore: PropTypes.bool,
    fetching: PropTypes.bool,
    value: PropTypes.string,

    noResults: PropTypes.string,
    noSearch: PropTypes.string,

    hideSearch: PropTypes.bool,
  };

  static defaultProps = {
    noResults: 'No results matching your search.',
    noSearch: 'Search here...',
  };

  shouldComponentUpdate(nextProps) {
    return shallowCompare(this, nextProps);
  }

  renderSearch() {
    const { value, noSearch, onSearch } = this.props;

    return (
      <DropdownListSearch
        value={value}
        label={noSearch}
        onSearch={onSearch}
      />
    );
  }

  render() {
    const { items,
            selectedItemId,
            hasMore,
            fetching,
            onFetchMore,
            onSelectItem,
            noResults,
            hideSearch,
    } = this.props;

    // do we need search input?
    const renderSearch = hideSearch ? null : this.renderSearch();

    return (
      <div className="Searchable-DropdownList">
        {renderSearch}
        <DropdownList
          items={items}
          selectedItemId={selectedItemId}
          hasMore={hasMore}
          fetching={fetching}
          onFetchMore={onFetchMore}
          onSelectItem={onSelectItem}
          noResults={noResults}
        />
      </div>
    );
  }
}
