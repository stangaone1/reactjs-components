import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import restrictedCompare from 'lib/utils/restricted-compare';

import {cloneDeep} from 'lodash';
import listensToClickOutside from 'react-click-outside';

import {Button} from 'views/components/buttons';
import Dropdown from 'views/components/dropdown';
import DropdownFooter from 'views/components/dropdown-footer';
import ScrollArea from 'views/components/scroll-area';
import Checkbox from 'views/components/checkbox';
import Radio from 'views/components/radio/radio';
import DropdownGroup from 'views/components/dropdown-group';

import './table-filters.scss';

/**
 * generates a group of 3 dropDowns that handle table filtering
 *  1. view dropDown - show/hide columns
 *  2. sort dropDown - used to sort columns
 *  3. filter dropDown - used for any filtering that is needed
 *
 */

@listensToClickOutside
export default class TableFilters extends Component {
  static propTypes = {
    className: PropTypes.string,
    /**
     * Will be used as filter dropDown content
     * should contain all table filters
     */
    children: PropTypes.node,
    /**
     * list of columns of the given table
     */
    columns: PropTypes.arrayOf(PropTypes.shape({
      row: PropTypes.string,
      /**
       * used as label for filtering columns and sorting
       */
      name: PropTypes.string,
      /**
       * if alwaysVisible === true it will show as disabled in view column
       * and will always be found in the list passed to onColumnChange
       */
      alwaysVisible: PropTypes.bool,
      /**
       * only sortable===true will appear in the sort dropDown
       */
      sortable: PropTypes.bool,
      /**
       * default state of column visibility
       */
      hidden: PropTypes.bool,
    })).isRequired,

    //
    //  (optional) ignore columns and DON'T create dropdown buttons
    //
    ignoreColumns: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string,
    ]),

    hasFilters: PropTypes.bool,
    /**
     * should be a function(Array<column> columns)
     * will receive an array of visible columns,
     * will filter out any hidden=true columns
     * will always recive a column that has alwaysVisible=true
     */
    onViewChange: PropTypes.func,
    /**
     * should be a function(String sortKey, String sortValue)
     * it will be called when user changes sort column or direction
     * sortKey will be the column.row value
     * sortValue will me 'ASC' or 'DESC'
     */
    onSortChange: PropTypes.func,
    /**
     * currently sort row name
     * should be equal with a column.row
     */
    sortKey: PropTypes.string,
    sortValue: PropTypes.oneOf(['ASC', 'DESC', 'asc', 'desc']),
    /**
     * will be displayed as NotificationBubble on filter dropdown
     */
    activeFilterCount: PropTypes.number,
    /**
     * handle called when user clicks on NotificationBubble
     */
    onFilterClear: PropTypes.func,
  };

  static defaultProps = {
    hasFilters: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: '',
      columns: cloneDeep(props.columns),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.columns !== this.props.columns) {
      this.setState({
        columns: nextProps.columns,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return restrictedCompare(this, nextProps, nextState);
  }

  handleDropDownClick(dropdown) {
    if (this.state.open === dropdown) {
      this.setState({
        open: '',
      });
    } else {
      this.setState({
        open: dropdown,
      });
    }
  }

  handleSortChange(key, value) {
    let index;
    const columns = this.state.columns;
    for (index = 0; index < columns.length; index++) {
      const col = columns[index];
      if (col.row === key) {
        if (col.hidden) {
          this.handleColumnVisibility(index);
        }
        break;
      }
    }

    if (this.props.onSortChange) {
      this.props.onSortChange(key || this.props.sortKey, value || this.props.sortValue || 'ASC', this.state.columns.filter(col => !col.hidden || col.alwaysVisible));
    }
  }

  handleColumnChange(newColumns) {
    if (this.props.onViewChange) {
      this.props.onViewChange(newColumns.filter(col => !col.hidden || col.alwaysVisible));
    }
  }

  resetDefaultColumns() {
    const newColumns = cloneDeep(this.props.columns);
    this.setState({
      columns: newColumns,
    });

    this.handleColumnChange(newColumns);
  }

  handleColumnVisibility(index) {
    const newColumns = cloneDeep(this.state.columns);
    newColumns[index].hidden = !newColumns[index].hidden;
    this.setState({
      columns: newColumns,
    });
    this.handleColumnChange(newColumns);
  }

  isColumnActive(columnName) {
    const { ignoreColumns = [] } = this.props;
    return !(ignoreColumns.indexOf(columnName) > -1);
  }

  handleClickOutside() {
    this.setState({
      open: '',
    });
  }

  renderViewColumns() {
    const viewColumns = this.state.columns;
    if (!viewColumns.length) {
      return void 0;
    }

    return (
      <Dropdown
        label="View"
        open={this.state.open === 'columns'}
        onClick={this.handleDropDownClick.bind(this, 'columns')}
        size="medium"
        className="TableFilters-view"
        theme="light"
        noPadding
      >
        <ScrollArea>
          <ul className="TableFilters-list">
            {viewColumns.map((col, index) => {
              if (!col.name) {
                return void 0;
              }

              return (
                <li key={index}>
                  <Checkbox
                    checked={!col.hidden || col.alwaysVisible}
                    label={col.name}
                    disabled={col.alwaysVisible}
                    onChange={this.handleColumnVisibility.bind(this, index)}
                  />
                </li>
              );
            })}
          </ul>
        </ScrollArea>
        <DropdownFooter>
          <Button
            centered
            size="small"
            onClick={this.resetDefaultColumns.bind(this)}
          >
            Reset to default
          </Button>
        </DropdownFooter>
      </Dropdown>
    );
  }

  renderSort() {
    const sortableColumns = this.state.columns;
    if (sortableColumns.filter(col => col.sortable && col.name && !col.hidden).length) {
      return (
        <Dropdown
          label="Sort"
          open={this.state.open === 'sort'}
          enableOnClickOutside
          onClick={this.handleDropDownClick.bind(this, 'sort')}
          size="medium"
          position="left"
          className="TableFilters-sort"
          theme="light"
          noPadding
        >
          <ScrollArea>
            <ul className="TableFilters-list">
              {sortableColumns.map((col, index) => {
                if (!col.sortable || !col.name || col.hidden) {
                  return void 0;
                }

                return (
                  <li key={index}>
                    <Radio
                      checked={col.row === this.props.sortKey}
                      label={col.name}
                      onChange={this.handleSortChange.bind(this, col.row, void 0)}
                    />
                  </li>
                );
              })}
            </ul>
          </ScrollArea>
          <DropdownFooter>
            <ul className="TableFilters-list">
              <li>
                <Radio
                  checked={this.props.sortValue && this.props.sortValue.toLowerCase() === 'asc'}
                  label="In Ascending Order"
                  onChange={this.handleSortChange.bind(this, this.props.sortKey, 'ASC')}
                />
              </li>
              <li>
                <Radio
                  checked={this.props.sortValue && this.props.sortValue.toLowerCase() === 'desc'}
                  label="In Descending Order"
                  onChange={this.handleSortChange.bind(this, this.props.sortKey, 'DESC')}
                />
              </li>
            </ul>
          </DropdownFooter>
        </Dropdown>
      );
    }
  }

  renderFilterDropDown() {
    if (this.props.children && this.props.hasFilters) {
      return (
        <Dropdown
          label="Filter"
          open={this.state.open === 'filter'}
          onClick={this.handleDropDownClick.bind(this, 'filter')}
          size="medium"
          theme="light"
          position="left"
          className="TableFilters-filter"
          notificationCount={this.props.activeFilterCount}
          onNotificationClick={this.props.onFilterClear}
          noPadding
        >
          {this.props.children}
        </Dropdown>
      );
    }
  }

  render() {
    const {className, children, columns, ...props} = this.props;
    const componentClasses = cx('TableFilters', {
      // modifiers here
    }, className);

    // render only the needed columns / dropdown buttons
    // (optional ignore: check 'ignoreColumns' propType)
    const viewDropdown = this.isColumnActive('view') ? this.renderViewColumns() : null;
    const sortDropdown = this.isColumnActive('sort') ? this.renderSort() : null;
    const filterDropdown = this.isColumnActive('filter') ? this.renderFilterDropDown() : null;

    return (
      <DropdownGroup {...props} className={componentClasses}>
        {viewDropdown}
        {sortDropdown}
        {filterDropdown}
      </DropdownGroup>
    );
  }
}
