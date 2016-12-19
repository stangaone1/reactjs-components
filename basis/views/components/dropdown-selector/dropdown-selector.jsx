import React, {Component, PropTypes} from 'react';
import cx from 'classnames';

import Dropdown from 'views/components/dropdown';
import SearchableDropdownList from 'views/components/dropdown-list/searchable-dropdown-list';

import './dropdown-selector.scss';

//
//  Dropdown Selector
//
export default class DropdownSelector extends Component {
  static propTypes = {
    size: PropTypes.string,
    className: PropTypes.string,

    value: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    selectedItem: PropTypes.number,

    searchText: PropTypes.string,
    onSearch: PropTypes.func,
    onSelect: PropTypes.func.isRequired,

    hasMore: PropTypes.bool,
    onFetchMore: PropTypes.func,

    noResults: PropTypes.string,
    noSearch: PropTypes.string,

    hideSearch: PropTypes.bool,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    value: 'select value',
    size: 'large',

    items: [],
    selectedItem: null,

    hasMore: false,
    noResults: 'No results matching your search.',
    noSearch: 'Search here...',

    hideSearch: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      dropdownOpened: false,
    };
  }

  onSearch(searchTerm) {
    // issue callback
    if (this.props.onSearch) {
      this.props.onSearch(searchTerm);
    }
  }

  onSearchFetchMore() {
    // issue callback
    if (this.props.onFetchMore) {
      this.props.onFetchMore();
    }
  }

  onSelect(itemIndex) {
    const { items } = this.props;

    // get item by id
    const selectedItem = items.filter(item => {
      return item.id === itemIndex;
    })[0];

    // issue callback
    this.props.onSelect(selectedItem);

    // auto-close dropdown
    this.toggleDropdown();
  }

  handleClickOutside() {
    this.setState({
      dropdownOpened: false,
    });
  }

  toggleDropdown() {
    // open / close dropdown
    this.setState({
      dropdownOpened: !this.state.dropdownOpened,
    });
  }

  render() {
    const { className, value, items, selectedItem, hasMore, searchText, size, disabled, noResults, noSearch, hideSearch } = this.props;

    return (
      <div className={cx('Dropdown-selector', className)}>
        <Dropdown
          label={value}
          disabled={disabled}
          open={this.state.dropdownOpened}
          onClick={this.toggleDropdown.bind(this)}
          theme="light"
          size={size}
          noPadding
        >
          <SearchableDropdownList
            value={searchText}
            items={items}
            selectedItemId={selectedItem}

            fetching={false}
            hasMore={hasMore}
            noResults={noResults}
            noSearch={noSearch}

            onSearch={this.onSearch.bind(this)}
            onSelectItem={this.onSelect.bind(this)}
            onFetchMore={this.onSearchFetchMore.bind(this)}

            hideSearch={hideSearch}
          />
        </Dropdown>
      </div>
    );
  }
}
