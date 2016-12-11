import React, { Component, PropTypes } from 'react';
// import restrictedCompare from 'lib/utils/restricted-compare';

export default class Cell extends Component {
  static propTypes = {
    children: PropTypes.node,
    customRenderer: PropTypes.func,
    checked: PropTypes.bool,
    rowData: PropTypes.object,
    value: PropTypes.any,
    rowIndex: PropTypes.number,
  };

  static defaultProps = {
    value: '',
    checked: false,
    customRenderer: null,
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   return restrictedCompare(this, nextProps, nextState);
  // }

  render() {
    const {customRenderer, children, value, rowData, rowIndex, ...other} = this.props;
    if (customRenderer !== null) {
      return (<div className="TableCell" {...other}>
        {customRenderer(value, rowIndex, rowData)}
      </div>);
    }

    const cellValue = value ? value.toString() : '';

    return (
      <div className="TableCell" {...other}>
        {cellValue}
        {children}
      </div>
    );
  }
}
