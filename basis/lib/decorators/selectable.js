import React, { Component, PropTypes, cloneElement, createElement } from 'react';

export default function Selectable(ComposedComponent) {
  const Selectable = class SelectableComponent extends Component {

    shouldComponentUpdate(nextProps) {
      const hasNextValue = nextProps.value && this.props.value !== nextProps.value;
      const hasNewName = this.props.name !== nextProps.name;
      const hasNewCheck = this.props.checked !== nextProps.checked;
      const hasNewPartial = this.props.isPartial !== nextProps.isPartial;
      const isDefaultSortBy = nextProps.sortBy === '';
      const hasSortableIsSorted = nextProps.sort && nextProps.sortable && this.props.sortBy !== nextProps.sortBy;
      return hasSortableIsSorted || (hasNewCheck || hasNextValue || hasNewName || hasNewPartial) || isDefaultSortBy;
    }

    _onChanged(ev) {
      if (this.props.onChanged) {
        this.props.onChanged(typeof ev === 'boolean' ? ev : ev.target.checked, this.props.rowData);
      }
    }

    render() {
      let selectableComponent = this.props.selectableComponent;
      if (selectableComponent) {
        const selectableReactComponent = typeof selectableComponent === 'function' ? createElement(selectableComponent) : selectableComponent;
        selectableComponent = cloneElement(selectableReactComponent, Object.assign({}, {
          onChange: this._onChanged.bind(this),
          checked: this.props.checked,
          isPartial: this.props.isPartial,
          disabled: selectableReactComponent.props.disabled,
          children: this.props.children,
        }));
      } else {
        selectableComponent = (
          <input
            type="checkbox"
            checked={this.props.checked}
            onChange={this._onChanged.bind(this)}/>
        );
      }

      return (
        <ComposedComponent {...this.props}>
          {selectableComponent}
        </ComposedComponent>
      );
    }
  };

  Selectable.defaultProps = {
    checked: false,
    isPartial: false,
  };

  Selectable.propTypes = {
    children: PropTypes.node,
    checked: PropTypes.bool,
    isPartial: PropTypes.bool,
    selectable: PropTypes.bool,
    onChanged: PropTypes.func,
    sortBy: PropTypes.string,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    name: PropTypes.string,
    rowData: PropTypes.object,
    selectableComponent: PropTypes.any,
  };
  return Selectable;
}
