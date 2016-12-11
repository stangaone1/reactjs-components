import React, {Component, PropTypes} from 'react';

import InputField from 'views/components/inputfield';
import Icon from 'views/components/icon';

import './add-more.scss';

export default class AddMore extends Component {
  constructor(props) {
    super(props);
    this.handleFieldBlur = this.handleFieldBlur.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.addMore = this.addMore.bind(this);
    this.state = {
      value: [],
    };
  }

  static propTypes = {
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    error: PropTypes.object,
    touched: PropTypes.bool,
    title: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
  };

  static defaultProps = {
    value: [''],
    title: '',
  };

  componentWillMount() {
    let defaultValue = this.props.defaultValue;
    let value = this.props.value;

    if (!Array.isArray(defaultValue)) {
      defaultValue = [defaultValue];
    }

    if (!Array.isArray(value)) {
      value = [value];
    }
    if (defaultValue) {
      this.setState({
        value: [...defaultValue],
      });
    } else {
      if (value) {
        this.setState({
          value: [...value],
        });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    let defaultValue = nextProps.defaultValue;
    let value = nextProps.value;
    if (!Array.isArray(defaultValue)) {
      defaultValue = [defaultValue];
    }

    if (!Array.isArray(value)) {
      value = [value];
    }

    if (value) {
      this.setState({
        value: [...value],
      });
    } else {
      if (defaultValue) {
        this.setState({
          value: [...defaultValue],
        });
      } else {
        this.setState({
          value: [''],
        });
      }
    }
  }

  addMore() {
    this.setState({
      value: this.state.value.concat(['']),
    });
  }

  handleFieldChange(index, inputValue) {
    const allValues = [...this.state.value];
    allValues[index] = inputValue;
    this.setState({
      value: allValues,
    }, ()=> {
      if (this.props.onChange) {
        this.props.onChange(allValues);
      }
    });
  }

  handleFieldBlur() {
    if (this.props.onBlur) {
      this.props.onBlur(this.state.value);
    }
  }

  handleRemoveField(index) {
    const allValues = [...this.state.value];
    allValues.splice(index, 1);
    this.setState({
      value: allValues,
    }, ()=> {
      if (this.props.onChange) {
        this.props.onChange(allValues);
      }
    });
  }

  renderMoreData() {
    const {touched} = this.props;
    let {value} = this.state;
    let addMoreError = '';
    if (!Array.isArray(value)) {
      value = [value];
    }
    if (value) {
      return value.map((valueData, index)=> {
        if (this.props.error && this.props.error[index]) {
          addMoreError = this.props.error[index].error;
        } else if (this.props.error && this.props.error.error) {
          addMoreError = this.props.error.error;
        }
        return (
          <InputField
            value={valueData}
            remove={index > 0}
            iconRemove={<Icon name="close" />}
            iconRemoveClick={this.handleRemoveField.bind(this, index)}
            error={addMoreError}
            touched={touched}
            onBlur={this.handleFieldBlur}
            onChange={this.handleFieldChange.bind(this, index)}
            key={index}
          />);
      });
    }
  }

  render() {
    const {title} = this.props;
    return (
      <div className="AddMore">
        <div className="AddMore-title">{title}</div>
        {this.renderMoreData()}
        <span onClick={this.addMore} className="AddMore-button">Add Another</span>
      </div>
    );
  }
}
