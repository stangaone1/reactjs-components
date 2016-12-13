import React, {Component} from 'react';
import RadioList from 'views/components/radio-list';

export default class RadioListContainer extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      value: 'Crew',
    };
  }

  onChange(value) {
    this.setState({
      value: value.value,
    });
  }

  render() {
    return (
      <div style={{backgroundColor: 'white'}}>
        <RadioList options={['test','test2','Crew']} value={this.state.value} onChange={this.onChange} />
      </div>
    );
  }
}
