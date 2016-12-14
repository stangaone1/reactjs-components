import React, { Component } from 'react';
import Table from 'views/components/table/table';
import Checkbox from 'views/components/checkbox';
import {rows, columns} from './table-data-mock';

export default class TableContainer extends Component {
  render() {
    if (!rows.length && !columns.length) return null;

    return (
      <div style={{width:900}}>
        <Table rows={rows}
               maxWidth={800}
               isStriped={false}
               columns={columns}
               customRenderColumn="setup"
               onColumnSort={this.onColumnSort}
               actionable
               actionsColLabel="Actions"
               selectableComponent={Checkbox}/>
      </div>);
  }
}

TableContainer.displayName = 'TableContainer';
