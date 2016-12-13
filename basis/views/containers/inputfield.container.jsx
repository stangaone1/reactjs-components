import React, { Component } from 'react';
import InputField from 'views/components/inputfield';
import Icon from 'views/components/icon';


class InputFieldContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      simpleInputValue: 'Some nice input you got here',
      multipleInputValue: 'Such a beautiful component',
    };

    setTimeout(() => {
      this.setState({
        simpleInputValue: 'Inputs can now change',
        multipleInputValue: 'From async calls',
      });
    }, 4000);
  }

  render() {
    const inputIcon = <Icon name="search" />;

    return (
        <div style={{width: 200}}>
          Singleline text input
          { /* single line input as normal input */ }
          <br />
          <InputField
            placeholder = "Some nice input you got here"
            value = {this.state.simpleInputValue}
            iconLeft = {inputIcon}
            iconLeftClick = {() => { console.log('clack'); }} />
          <InputField
            placeholder = "Some nice input you got here"
            value = {this.state.simpleInputValue}
            label = "Required field 1"
            required
            multiline
            icon = {inputIcon}
            iconClick = {() => {console.log('click'); }}/>
          <InputField
            placeholder = "Some nice input you got here"
            value = {this.state.simpleInputValue}
            label = "Required field 2"
            required />
          <InputField
            placeholder = "Placeholder 1"
            icon = {inputIcon}
            iconLeft = {inputIcon} />
          <InputField
            placeholder = "Placeholder 2" />
            <InputField
              label = "Error with label"
              icon = {inputIcon}
              error = "This field is required"
              required multiline/>
            <InputField
              label = "searchSuccess with label"
              icon = {inputIcon}
              success />
            <InputField
              icon = {inputIcon}
              success
              multiline
              required />
          <br />
          <br />
          Multiline text InputField
          { /* multile input acting as textarea */ }
          <InputField
            maxLength = {40}
            multiline
            resizable
            required
            value = {this.state.multipleInputValue}
            icon = {inputIcon} />
        </div>
    );
  }
}

InputFieldContainer.displayName = 'InputFieldContainer';
InputFieldContainer.propTypes = {};
InputFieldContainer.defaultProps = {};

export default InputFieldContainer;
