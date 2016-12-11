import React, { Component } from 'react';
import Header from './header';
import selectable from 'lib/decorators/selectable';

@selectable
export default class SelectableHeader extends Component {
  render() {
    return <Header {...this.props} />;
  }
}
