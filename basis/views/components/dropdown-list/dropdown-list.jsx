import React, { Component, PropTypes } from 'react';
import DropdownListItem from './dropdown-list-item';
import InfiniteScroll from 'views/components/infinite-scroll';
import shallowCompare from 'react-addons-shallow-compare';
import './dropdown-list.scss';

export default class DropdownList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    selectedItemId: PropTypes.number,
    onFetchMore: PropTypes.func,
    onSelectItem: PropTypes.func,
    hasMore: PropTypes.bool,
    fetching: PropTypes.bool,
    noResults: PropTypes.string,
  };

  shouldComponentUpdate(nextProps) {
    return shallowCompare(this, nextProps);
  }

  renderNoResults() {
    const { items, fetching } = this.props;
    const noResults = this.props.noResults || 'No results';

    if (!items.length && !fetching) {
      return <span className="DropdownList-noResults">{noResults}</span>;
    }

    return null;
  }

  renderDropdownListItems() {
    const { items, selectedItemId, onSelectItem } = this.props;

    return items.map((item, index) => {
      return (
        <DropdownListItem
          key={index}
          id={item.id}
          title={item.name}
          onClick={onSelectItem}
          active={item.id === selectedItemId}
          className={item.className}
          bulk={item.bulk}
        >
          {item.description}
        </DropdownListItem>
      );
    });
  }

  render() {
    const { hasMore, fetching, onFetchMore } = this.props;
    const noResults = this.renderNoResults();

    return (
      <InfiniteScroll
        onScrollBottom={onFetchMore}
        hasMore={hasMore}
        fetching={fetching}
      >
        <ul className="DropdownList">
          {this.renderDropdownListItems()}
        </ul>
        {noResults}
      </InfiniteScroll>
    );
  }
}
