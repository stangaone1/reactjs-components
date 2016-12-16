import React, {PropTypes, Component, cloneElement} from 'react';
import {findDOMNode} from 'react-dom';
import cx from 'classnames';
import {map, isArray, indexOf, isNaN} from 'lodash';
import invariant from 'invariant';
import restrictedCompare from 'lib/utils/restricted-compare';

import Header from './header';
import SelectableHeader from './selectable-header';
import Cell from './cell';
import SelectableCell from './selectable-cell';

import './table.scss';

export default class Table extends Component {

  static propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    selectedRows: PropTypes.array,
    selectableComponent: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.element,
      PropTypes.instanceOf(React.DOM.input),
    ]),
    isBordered: PropTypes.bool,
    isBorderedTop: PropTypes.bool,
    isStriped: PropTypes.bool,
    selectAll: PropTypes.bool,
    minCellWidth: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    activeRow: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    customRender: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    maxWidth: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    sortKey: PropTypes.string,
    sortValue: PropTypes.string,
    rowLink: PropTypes.string,
    className: PropTypes.string,
    onSelectAll: PropTypes.func,
    onColumnSort: PropTypes.func,
    onRowSelect: PropTypes.func,
    onRowClick: PropTypes.func,
  };

  static defaultProps = {
    isBordered: false,
    isBorderedTop: true,
    isStriped: false,
    rows: [],
    columns: [],
    selectedRows: [],
    selectableComponent: <input type="checkbox"/>,
    minCellWidth: 100,
    maxWidth: 1050,
  };

  constructor() {
    super();
    this.state = {
      dynamicTable: false,
      tableScrollPaddingRight: 0,
      tableScrollPaddingLeft: 0,
    };
    this.onSelectableCellClick = this.onSelectableCellClick.bind(this);
    this.onRowSelect = this.onRowSelect.bind(this);
  }

  componentDidMount() {
    if (!this.state.dynamicTable) {
      this.hasScroll();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return restrictedCompare(this, nextProps, nextState);
  }

  componentDidUpdate(prevProps, prevState) {
    this.hasScroll();
    const columnsFixed = this.getFixedColumns();
    console.log('columnsFixed', columnsFixed);
    if (!this.state.dynamicTable || !columnsFixed.length || this.state.dynamicTable === prevState.dynamicTable) return;
    const borderLeftWidth = 2;
    const tableElement = findDOMNode(this);
    const fixedLeftEl = tableElement.getElementsByClassName('Table--fixedLeft')[0];
    const fixedRightEl = tableElement.getElementsByClassName('Table--fixedRight')[0];
    const tableFixedLeftWidth = this.hasWidth(fixedLeftEl) ? fixedLeftEl.offsetWidth - borderLeftWidth : 0;
    const tableFixedRightWidth = this.hasWidth(fixedRightEl) ? fixedRightEl.offsetWidth : 0;
    if (this.state.tableScrollPaddingLeft !== tableFixedLeftWidth ||
      this.state.tableScrollPaddingRight !== tableFixedRightWidth) {
      this.updateTableDimensions(tableFixedLeftWidth, tableFixedRightWidth);
    }
  }

  onSelectAll(selected) {
    if (this.props.onSelectAll) {
      this.props.onSelectAll(selected);
    }
  }

  onRowSelect(selected, rowData) {
    if (this.props.onRowSelect) {
      this.props.onRowSelect(rowData.id, selected);
    }
  }

  getTableWidth() {
    if (!this.state.dynamicTable) {
      if (findDOMNode(this)) {
        return findDOMNode(this).offsetWidth;
      }
      return 0;
    }
    return findDOMNode(this.refs.tableScrolled).offsetWidth;
  }

  getFixedColumns() {
    const {columns} = this.props;
    return columns.filter(colData => colData.fixed);
  }

  hasScroll() {
    const {maxWidth} = this.props;

    const tableWidth = this.getTableWidth() || maxWidth;
    if (tableWidth && tableWidth >= maxWidth && maxWidth > 0) {
      if (!this.state.dynamicTable) {
        this.setState({
          dynamicTable: true,
          tableScrollWidth: tableWidth,
        });
      }
    } else {
      if (this.state.dynamicTable) {
        this.setState({
          dynamicTable: false,
        });
      }
    }
  }

  hasWidth(el) {
    return el && !isNaN(el.offsetWidth) && (el.offsetWidth !== undefined);
  }

  updateTableDimensions(paddingLeft, paddingRight) {
    this.setState({
      tableScrollPaddingLeft: paddingLeft,
      tableScrollPaddingRight: paddingRight,
    });
  }

  groupByConsecutiveKeyValues(elements, key) {
    const result = [];
    let temp = [];
    let difference;
    elements.forEach((element, i)=> {
      if (difference !== (element[key] - i)) {
        if (difference !== undefined) {
          result.push(temp);
          temp = [];
        }
        difference = element[key] - i;
      }
      temp.push(element);
    });

    if (temp.length) {
      result.push(temp);
    }
    return result;
  }

  findColumnCustomRenderer(customRender, columnData) {
    let customColumns = [];
    let isCustomRendered;
    let customRenderer;

    if (isArray(customRender)) {
      customColumns = map(customRender, 'column');
      const isCustomIndex = indexOf(customColumns, columnData.row);
      isCustomRendered = isCustomIndex !== -1;
      customRenderer = isCustomRendered ? customRender[isCustomIndex].renderer : null;
    } else {
      isCustomRendered = customRender.column === columnData.row;
      customRenderer = isCustomRendered ? customRender.renderer : null;
    }

    return customRenderer;
  }

  generateTable(rows, columns, extraClassname) {
    const {className} = this.props;

    const tableClasses = {
      'Table': true,
      'Table--bordered': this.props.isBordered,
      'Table--borderedTop': this.props.isBorderedTop,
      'Table--striped': this.props.isStriped,
    };

    return (
      <div className={cx(tableClasses, className, extraClassname)}>
        <div className="TableRow">
          {this.renderHeader(columns)}
        </div>
        {this.renderRows(rows, columns)}
      </div>
    );
  }

  onRowClick(rowId) {
    if (this.props.onRowClick) {
      this.props.onRowClick(+rowId);
    }
  }

  onSelectableCellClick(ev) {
    ev.stopPropagation();
  }

  renderRows(rows, columns) {
    const {selectedRows, activeRow} = this.props;
    return map(rows, (rowData, rowIndex) => {
      const rowKey = `Row ${rowIndex}`;
      const rowClasses = cx({
        'TableRow': true,
        'TableRow--selected': selectedRows.length ? selectedRows.indexOf(rowData.id) !== -1 : false,
        'TableRow--active': activeRow === rowData.id,
      });
      return (
        <div className={rowClasses} key={rowKey} onClick={this.onRowClick.bind(this, rowData.id)}>
          {this.renderColumns(columns, rowData, rowIndex)}
        </div>
      );
    });
  }

  renderColumns(columns, rowData, rowIndex) {
    const {selectedRows} = this.props;
    const {
      selectableComponent,
      minCellWidth,
      customRender,
    } = this.props;

    return map(columns, (columnData, colIndex) => {
      const cellData = rowData[columnData.row];
      const cellKey = `Cell ${rowIndex}${colIndex}`;
      const {selectable} = columnData;


      let customRenderer;
      if (customRender) {
        customRenderer = this.findColumnCustomRenderer(customRender, columnData);
      }

      invariant(
        customRenderer
        || typeof cellData === 'string'
        || typeof cellData === 'number'
        || Array.isArray(cellData)
        || cellData === null
        || cellData === undefined
        || columnData.selectable
        || columnData.row === 'actions',
        'Invalid value "%s" supplied to cell on column "%s"',
        cellData,
        columnData.row
      );

      const width = columnData.width || minCellWidth;
      const style = width ? {
        maxWidth: width,
      } : null;

      const CellComp = (
        <Cell
          rowData={rowData}
          key={cellKey}
          customRenderer={customRenderer}
          rowIndex={rowIndex}
          id={colIndex}
          style={style}
          value={cellData || null}/>
      );

      if (selectable && !customRenderer) {
        const SelectableCellComp = (
          <SelectableCell
            rowData={rowData}
            id={colIndex}
            key={cellKey}
            style={style}
            onClick={this.onSelectableCellClick}
            onChanged={this.onRowSelect}
            selectableComponent={selectableComponent}
            value={cellData || null}/>
        );
        return cloneElement(SelectableCellComp, {checked: selectedRows.length ? selectedRows.indexOf(rowData.id) !== -1 : false});
      }

      return CellComp;
    });
  }

  renderHeader(columns) {
    const {
      selectAll,
      selectableComponent,
      customRender,
      sortKey,
      sortValue,
      onColumnSort,
      minCellWidth,
      selectedRows,
    } = this.props;

    return map(columns, (columnData, index)=> {
      const headerKey = `header ${index}`;
      const {sortable, selectable, ...colData} = columnData;
      const width = columnData.width || minCellWidth;
      const style = width ? {
        minWidth: width,
      } : null;

      const HeaderComp = (
        <Header
          isHeader
          id={index}
          style={style}
          sortable={sortable}
          sortBy={sortValue}
          sortKey={sortKey}
          onColumnSort={onColumnSort}
          key={headerKey}
          {...colData}/>
      );

      if (selectable) {
        let customRenderer;
        if (customRender) {
          customRenderer = this.findColumnCustomRenderer(customRender, columnData);
        }

        const SelectableHeaderComp = (
          <SelectableHeader
            isHeader
            id={index}
            style={style}
            isPartial={!selectAll && selectedRows.length > 0}
            checked={selectAll}
            selectableComponent={customRenderer ? customRenderer(selectAll, colData.rowData, colData.rowIndex) : selectableComponent}
            key={headerKey}
            onChanged={this.onSelectAll.bind(this)}
            {...colData}/>
        );

        return SelectableHeaderComp;
      }

      return HeaderComp;
    });
  }

  render() {
    const {rows, columns} = this.props;
    if (!rows.length || !columns.length) return null;

    const borderWidth = 3;
    let fixedLeftTable;
    let fixedRightTable;
    let scrolledTable;
    if (this.state.dynamicTable) {
      const columnsElementsUnFixed = columns.filter(colData => !colData.fixed);
      const columnsElementsFixed = this.getFixedColumns();
      console.log('columnsElementsFixedcolumnsElementsFixed', columnsElementsFixed);
      if (columnsElementsFixed.length) {

        const fixedTables = columnsElementsFixed.length ? this.groupByConsecutiveKeyValues(columnsElementsFixed, 'index') : [];
        console.log('fixedTables', fixedTables);
        console.log('fixedTables.length', fixedTables.length);
        invariant(fixedTables.length < 3, 'Only support fixed tables for table margin columns');

        const [fixedLeftTableData, fixedRightTableData] = fixedTables;
        if (fixedLeftTableData && fixedLeftTableData.length) {
          let singleFixedToRight;
          if (!fixedRightTable) {
            const lastColumnIndex = fixedLeftTableData[fixedLeftTableData.length - 1].index;
            const middleColumnIndex = Math.round(columnsElementsFixed.length / 2);
            singleFixedToRight = lastColumnIndex > middleColumnIndex;
          }
          fixedLeftTable = this.generateTable(rows, fixedLeftTableData, !singleFixedToRight ? 'Table--fixedLeft' : 'Table--fixedRight');
        }
        if (fixedRightTableData && fixedRightTableData.length) {
          fixedRightTable = this.generateTable(rows, fixedRightTableData, 'Table--fixedRight');
        }
      }
      scrolledTable = this.generateTable(rows, columnsElementsUnFixed);
      const scrollTableStyle = {
        paddingLeft: this.state.tableScrollPaddingLeft,
        paddingRight: this.state.tableScrollPaddingRight,
      };

      return (
        <div className="Table-container">
          {fixedLeftTable}
          <div className="Table--scrolled">
            {cloneElement(scrolledTable, {
              ref: 'tableScrolled',
              style: Object.assign({}, scrolledTable.props.style, scrollTableStyle),
            })}
          </div>
          {fixedRightTable}
        </div>);
    }
    return cloneElement(this.generateTable(rows, columns, 'Table--full'), {
      style: {
        display: 'table',
        width: this.props.maxWidth - borderWidth,
        marginLeft: 1,
        marginRight: 1,
        borderRight: 0,
        borderLeft: 0,
      },
    });
  }
}
