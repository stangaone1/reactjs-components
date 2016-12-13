import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import CheckboxSection from 'views/components/checkbox-section';

export default class CheckboxContainer extends Component {
  constructor() {
    super();
    this.state = {
      checked1: true,
      checked2: true,
      checked3: true,
      checked4: false,
      checked5: false,
      checked6: false,
      checked7: true,
      checked8: true,
      checked9: true,
      checked10: true,
      checked11: true,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  onChange(id, value) {
    this.setState({
      ['checked' + id]: value,
    });
  }

  render() {
    const divStyle = {width: 225};
    console.log('this.state.checked1', this.state.checked1);
    return (
      <div style={divStyle}>

        <CheckboxSection
          checked={this.state.checked1}
          label="Checkbox 1"
          onChange={this.onChange.bind(this, 1)}
          required
          className="testClass"
          text = "Bishop, CA"
        />
        value: {this.state.checked1.toString()}
        <br /><br />
        <CheckboxSection
          checked={this.state.checked2}
          label="Checkbox 2"
          onChange={this.onChange.bind(this, 2)}
          required
          text="required, disabled, default true"
          disabled
        />
        value: {this.state.checked2.toString()}
        <br /><br />
        <CheckboxSection
          checked={this.state.checked3}
          label="Checkbox 3, no text"
          onChange={this.onChange.bind(this, 3)}
        />
        value: {this.state.checked3.toString()}
        <br /><br />

        <CheckboxSection
          checked={this.state.checked5}
          label="Checkbox 5"
          onChange={this.onChange.bind(this, 5)}
          required
          text="required, disabled, default false"
          disabled
        />
        value: {this.state.checked5.toString()}
        <br /><br />
        <CheckboxSection
          checked={this.state.checked6}
          label="Checkbox 6"
          onChange={this.onChange.bind(this, 6)}
          text="done, default false"
          done
        />
        value: {this.state.checked6.toString()}
        <br /><br />
        <CheckboxSection
          checked={this.state.checked7}
          label="Checkbox 7"
          onChange={this.onChange.bind(this, 7)}
          text="done, default true"
          done
        />
        value: {this.state.checked7.toString()}
        <br /><br />

        <CheckboxSection
          checked={this.state.checked8}
          label="Checkbox 8"
          onChange={this.onChange.bind(this, 8)}
          text="done, disabled, default true"
          disabled
          done
        />
        <br /><br />

        <strong>Note:</strong> The width is given by the parent container
        <CheckboxSection
          checked={this.state.checked9}
          label="Checkbox 9 with a really long label"
          onChange={this.onChange.bind(this, 9)}
          text="default true, but it has a really, really, long text section"
        />
        value: {this.state.checked9.toString()}
        <br /><br />

        <CheckboxSection
          checked={this.state.checked10}
          label="Checkbox 10"
          focused
          onChange={this.onChange.bind(this, 10)}
          text="default true, focused"
        />
        value: {this.state.checked10.toString()}
        <br /><br />

        <CheckboxSection
          checked={this.state.checked11}
          label="Checkbox 11"
          onChange={this.onChange.bind(this, 11)}
          text="default true, custom content inside"
        >
          <button onClick={(e) => e.preventDefault()}>custom button</button>
        </CheckboxSection>
        value: {this.state.checked11.toString()}
        <br /><br />
      </div>
    );
  }
}
