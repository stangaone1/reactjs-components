import React, {Component, PropTypes} from 'react';
import invariant from 'invariant';
import Select from 'views/components/select';
import CheckboxList from 'views/components/checkbox-list';

export default class WidgetConfigBuilder extends Component {
  static propTypes = {
    fields: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    fields: [],
  };

  onOptionsChange(fieldType, fieldValue) {
    const {fields} = this.props;
    const newFields = fields.map(field => {
      if (field.name === fieldType) {
        field.value = fieldValue;
      }
      return field;
    });
    this.props.onChange(newFields);
  }

  renderFieldType(field) {
    switch (field.type) {
    case 'select':
      return this.renderFieldSelectType(field);
    case 'checkbox':
      return this.renderFieldCheckboxType(field);
    default:
    }
  }

  renderFieldLabel(value) {
    return (<label className="WidgetConfigField-label">{value}:</label>);
  }

  renderFieldSelectType(field) {
    if (!field.options.length) return undefined;

    const {options} = field;
    const preselected =
      options.filter(option => option.value === field.value).shift() || options[0];
    const placeholder = preselected.label;

    return (
      <Select
        value={preselected.value}
        placeholder={placeholder}
        onChange={this.onOptionsChange.bind(this, field.name)}
      >
        {field.options.map((item, idx) => {
          return (<option key={idx} value={item.value}>{item.label}</option>);
        })}
      </Select>
    );
  }

  renderFieldCheckboxType(field) {
    invariant((typeof field.value === 'object' || typeof field.value === undefined),
      'The selected value of a checkbox type must be an array');

    return (
      <CheckboxList
        options={field.options}
        value={field.value}
        onChange={this.onOptionsChange.bind(this, field.name)}
      />
    );
  }

  render() {
    return (
      <div>
        {this.props.fields.map((field, idx) => {
          return (
            <div key={'widget-options' + idx} className="WidgetConfigField">
              {this.renderFieldLabel(field.label)}
              {this.renderFieldType(field)}
            </div>
          );
        })}
      </div>
    );
  }
}
