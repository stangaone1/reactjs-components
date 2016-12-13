import React, { Component } from 'react';
import Table from 'views/components/table/table';
import Checkbox from 'views/components/checkbox';
import {rows, columns} from './table-data-mock';

export default class TableContainer extends Component {
  render() {
    if (!rows.length && !columns.length) return null;

    return (<Table rows={rows}
                   maxWidth={1250}
                   isStriped={false}
                   columns={columns}
                   customRenderColumn="setup"
                   customRenderer={this.customRenderCell}
                   onColumnSort={this.onColumnSort}
                   actionable
                   actionsColLabel="Actions"
                   selectableComponent={Checkbox}/>);
  }
}

TableContainer.displayName = 'TableContainer';
