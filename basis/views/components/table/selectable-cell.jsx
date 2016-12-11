import React, { Component } from 'react';
import selectable from 'lib/decorators/selectable';
import Cell from './cell';

@selectable
export default class SelectableCell extends Component {
  render() {
    return (<Cell {...this.props}/>);
  }
}
