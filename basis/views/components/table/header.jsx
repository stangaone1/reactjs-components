import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

import restrictedCompare from 'lib/utils/restricted-compare';
import Icon from 'views/components/icon';
const SORT = {
  ASC: 'ASC',
  DESC: 'DESC',
};

export default class Header extends Component {
  static propTypes = {
    onColumnSort: PropTypes.func,
    name: PropTypes.string.isRequired,
    row: PropTypes.string,
    sortBy: PropTypes.string,
    sort: PropTypes.bool,
    sortKey: PropTypes.string,
    selectable: PropTypes.bool,
    sortable: PropTypes.bool,
    style: PropTypes.object,
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.element,
    ]),
  };

  static defaultProps = {
    name: '',
    row: '',
    sort: false,
    sortable: false,
    sortBy: '',
  };

  shouldComponentUpdate(nextProps, nextState) {
    return restrictedCompare(this, nextProps, nextState);
  }

  onClick() {
    if (this.props.sortable && this.props.onColumnSort) {
      const sortBy = this.props.sortBy === SORT.ASC ? SORT.DESC : SORT.ASC;
      this.props.onColumnSort(this.props.row, sortBy);
    }
  }

  isSorted() {
    return this.props.sortKey === this.props.row && (this.props.sortBy === SORT.ASC || this.props.sortBy === SORT.DESC);
  }

  renderSortIcons() {
    const isSorted = this.isSorted();
    const {sortable, sortBy} = this.props;

    const sortIconClassesASC = cx(
      'Icon--table',
      'Icon--up',
      {'Icon--enabled': isSorted && sortBy === SORT.ASC},
      {'Icon--disabled': isSorted && sortBy !== SORT.ASC}
    );

    const sortIconClassesDESC = cx(
      'Icon--table',
      'Icon--down',
      {'Icon--enabled': isSorted && sortBy === SORT.DESC},
      {'Icon--disabled': isSorted && sortBy !== SORT.DESC}
    );

    return sortable ? (
      <div className="Table-headSorter">
        <Icon
          className={sortIconClassesASC}
          name="arrow"/>
        <Icon
          className={sortIconClassesDESC}
          name="arrow"/>
      </div>
    ) : null;
  }

  render() {
    const isSorted = this.isSorted();

    const cellHeaderClasses = cx({
      'TableCell': true,
      'TableCell--head': true,
      'TableCell--active': isSorted,
    });

    return (
      <div
        style={this.props.style}
        className={cellHeaderClasses}
        onClick={this.onClick.bind(this)}>
        <div className="Table-headBlock">
          {this.props.children}
          <span>
            {this.props.name}
          </span>
          {this.renderSortIcons()}
        </div>
      </div>);
  }
}
