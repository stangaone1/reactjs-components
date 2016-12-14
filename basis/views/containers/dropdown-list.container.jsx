import React, { Component, PropTypes } from 'react';
import SearchableDropdownList from 'views/components/dropdown-list/searchable-dropdown-list';


export default class DropdownListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemId: null,
      searchText: '',
    };
  }

  componentWillMount() {
    if(this.props.loadData) {
      this.props.loadData();
    }
  }

  _onFetchMore() {
    console.log('fetch more data')
  }

  _onSearch(searchText) {
    console.log('search for the text', searchText);
    this.setState({
      searchText,
    });
  }

  _onSelectItem(itemId) {
    this.setState({
      selectedItemId: itemId,
    });
  }

  render() {
    const {data} = this.props;

    return (
      <div>
        <h3>Dropdown List Component ({this.state.selectedItemId})</h3>
        <div style={{width: 500, border: 'solid'}}>
          <SearchableDropdownList
            items={data.items}
            selectedItemId={this.state.selectedItemId}
            hasMore={data.items.length < data.itemsCount}
            fetching={data.isFetching}
            onFetchMore={this._onFetchMore.bind(this)}
            onSearch={this._onSearch.bind(this)}
            onSelectItem={this._onSelectItem.bind(this)} />
        </div>
      </div>
    );
  }
}

DropdownListContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
