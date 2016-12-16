import React, { Component } from 'react';
import ToggleCheckbox from 'views/components/toggle-checkbox';

class ToggleCheckboxContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      checkboxes: [],
    };
  }

  componentWillMount() {
    this.setState({
      checkboxes: [
        {
          label: 'Some really long text',
          checked: true,
          filterActive: true,
        },
        {
          label: 'Another label',
        },
        {
          label: 'Disabled checkbox',
          disabled: true,
        },
      ],
    });
  }

  _checkItem(key) {
    let checkboxList = null; // fml
    checkboxList = this.state.checkboxes;
    checkboxList[key].checked = !checkboxList[key].checked ? true : false;

    this.setState({
      checkboxes: checkboxList,
    });
  }

  _filterItem(key) {
    let checkboxList = null; // fml
    checkboxList = this.state.checkboxes;
    checkboxList[key].filterActive = !checkboxList[key].filterActive ? true : false;

    this.setState({
      checkboxes: checkboxList,
    });
  }

  _renderToggleCheckboxes() {
    return this.state.checkboxes.map((item, key) => {
      return (
        <ToggleCheckbox
          key={'toggleCheckbox_' + key}
          label={item.label}
          checked={item.checked}
          disabled={item.disabled}
          filterActive={item.filterActive}
          onChange={this._checkItem.bind(this, key)}
          onActivateFilter = {this._filterItem.bind(this, key)} />
      );
    });
  }

  render() {
    return (
        <div style={{paddingLeft: 20, width: 250}}>
          {this._renderToggleCheckboxes()}
        </div>
    );
  }
}

ToggleCheckboxContainer.displayName = 'ToggleCheckboxContainer';
ToggleCheckboxContainer.propTypes = {};
ToggleCheckboxContainer.defaultProps = {};

export default ToggleCheckboxContainer;
