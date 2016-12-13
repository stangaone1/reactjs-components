import React, { Component } from 'react';
import Table from 'views/components/table';
import Dropdown from 'views/containers/dropdown.container';

const DROPDOWN_ITEMS = [
  {value: '0', label: 'Edit'},
  {value: '1', label: 'Quick edit'},
  {value: '2', label: 'Create a copy'},
  {value: '3', label: 'Delete'},
];

export default class TableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectRows: [],
      rows: [],
      columns: [],
      sortKeyData: {name: 'col 2'},
      sortBy: 'asc',
    };

    this._onSelectAll = this._onSelectAll.bind(this);
    this._onRowsFilter = this._onRowsFilter.bind(this);
    this._onRowSelect = this._onRowSelect.bind(this);
    this._onRowDetail = this._onRowDetail.bind(this);
    this._onColumnSort = this._onColumnSort.bind(this);
    this._onDropdownItemSelect = this._onDropdownItemSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      columns: nextProps.columns ? nextProps.columns : [],
      rows: nextProps.rows ? nextProps.rows : [],
    });
  }

  _onSelectAll(selected) {
    const newRows = selected ? this.state.rows.slice() : [];
    this.setState({
      selectRows: newRows,
    });
  }

  _onRowsFilter(filterKeyData, showOnlyFiltedElements) {
    let rowsToFilter = this.state.rows;
    Object.keys(filterKeyData).forEach((filterKey) => {
      rowsToFilter = rowsToFilter.filter((rowData)=> {
        return filterKeyData[filterKey] ? (rowData.hasOwnProperty(filterKey) && filterKeyData[filterKey].indexOf(rowData[filterKey]) !== -1) : rowData.hasOwnProperty(filterKey);
      });
    });

    this.setState({
      selectRows: rowsToFilter,
      rows: showOnlyFiltedElements ? rowsToFilter : this.state.rows,
    });
  }

  _onRowSelect(rowSelect, rowData) {
    if (!rowSelect) {
      this.state.selectRows.splice(this.state.selectRows.indexOf(rowData), 1);
    }

    this.setState({
      selectRows: rowSelect ? this.state.selectRows.concat([rowData]) : this.state.selectRows,
    });
  }

  _onRowDetail(rowData) {
    const detailRow = {
      detailRow: true,
      data: rowData.details,
    };
    const hasRow = this.state.rows.some(row => row.detailRow && row.data === rowData.details);
    if (!hasRow) {
      this.state.rows.splice(this.state.rows.indexOf(rowData) + 1, 0, detailRow);
    } else {
      this.state.rows.splice(this.state.rows.indexOf(rowData) + 1, 1);
    }

    this.setState({
      rows: this.state.rows,
    });
  }

  _onColumnSort(columnDataKey, sortBy) {
    this.setState({
      sortBy: sortBy === 'asc' ? 'desc' : 'asc',
      sortKeyData: columnDataKey,
    });
  }

  _onDropdownItemSelect(value) {
    console.log('action', value);
  }

  render() {
    if (!this.state.rows.length && !this.state.columns.length) return null;

    return (<Table rows={this.state.rows}
                   columns={this.state.columns}
                   selectable
                   selectColWidth={50}
                   selectColLabel="All"
                   minCellWidth={100}
                   height={500}
                   fixedHeader
                   onSelectAll={this._onSelectAll}
                   onRowSelect={this._onRowSelect}
                   onRowsFilter={this._onRowsFilter}
                   onRowDetail={this._onRowDetail}
                   onColumnSort={this._onColumnSort}
                   selectRows={this.state.selectRows}
                   selectableComponent={<input type="checkbox"/>}
                   filterable
                   showOnlyFilteredRows={false}
                   filterKey={'id'}
                   filterKeyData={{id: [0, 1, 2], name: 'Verona Rippin'}}
                   sortKeyData={this.state.sortKeyData}
                   sortValue={this.state.sortBy}
                   details
                   actionable
                   actionsColLabel="Actions"
                   actionsColWidth={100}
                   actionableComponent={<Dropdown data={DROPDOWN_ITEMS} label="Actions" onItemSelect={this._onDropdownItemSelect}/>}
                   rowLink="http:wwww.google.com"
      />);
  }
}

TableContainer.displayName = 'TableContainer';
