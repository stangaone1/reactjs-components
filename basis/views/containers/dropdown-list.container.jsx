//import React, { Component, PropTypes } from 'react';
//import { bindActionCreators } from 'redux';
//import { connect } from 'react-redux';
//import {RestaurantsActionsFacade as RestaurantsActions} from 'store/restaurants/restaurants';
//import SearchableDropdownList from 'views/components/dropdown-list/searchable-dropdown-list';
//
//@connect(state=>({
//  restaurantsState: state.restaurants,
//}))
//
//export default class DropdownListContainer extends Component {
//  constructor(props) {
//    super(props);
//
//    this.state = {
//      selectedItemId: null,
//      searchText: '',
//    };
//  }
//
//  componentWillMount() {
//    const {dispatch, restaurantsState} = this.props;
//    const hasTable = false;
//    const actions = bindActionCreators(RestaurantsActions, dispatch);
//    actions.loadRestaurants(hasTable, restaurantsState.itemsPerLoad || 10);
//  }
//
//  _onFetchMore() {
//    const {dispatch, restaurantsState} = this.props;
//    const hasTable = false;
//    const limit = restaurantsState.restaurants.length + restaurantsState.itemsPerLoad || 10;
//    const actions = bindActionCreators(RestaurantsActions, dispatch);
//
//    if (this.state.searchText) {
//      actions.searchRestaurants(limit, this.state.searchText);
//    } else {
//      actions.loadRestaurants(hasTable, limit);
//    }
//  }
//
//  _onSearch(searchText) {
//    const {dispatch, restaurantsState} = this.props;
//    const actions = bindActionCreators(RestaurantsActions, dispatch);
//    actions.searchRestaurants(restaurantsState.itemsPerLoad || 10, searchText);
//
//    this.setState({
//      searchText,
//    });
//  }
//
//  _onSelectItem(itemId) {
//    this.setState({
//      selectedItemId: itemId,
//    });
//  }
//
//  render() {
//    const {restaurantsState} = this.props;
//
//    return (
//      <div>
//        <h3>Dropdown List Component ({this.state.selectedItemId})</h3>
//        <div style={{width: 400, border: 'solid'}}>
//          <SearchableDropdownList
//            items={restaurantsState.restaurants}
//            selectedItemId={this.state.selectedItemId}
//            hasMore={restaurantsState.restaurants.length < restaurantsState.itemsCount}
//            fetching={restaurantsState.isFetching}
//            onFetchMore={this._onFetchMore.bind(this)}
//            onSearch={this._onSearch.bind(this)}
//            onSelectItem={this._onSelectItem.bind(this)} />
//        </div>
//      </div>
//    );
//  }
//}
//
//DropdownListContainer.propTypes = {
//  dispatch: PropTypes.func.isRequired,
//  restaurantsState: PropTypes.object.isRequired,
//};
