import React, {Component} from 'react';
import CheckboxList from 'views/components/checkbox-list';

const options = [1, 2, 3, 4, 5]
  .map((i) => ({label: 'option ' + i, value: i}));

export default class CheckboxListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
    };
  }

  handleChange(values) {
    this.setState({values});
  }

  render() {
    return (
      <div>
        <CheckboxList
          options={options}
          value={this.state.values}
          onChange={this.handleChange.bind(this)}
        />
        <br/>
        values : {JSON.stringify(this.state.values)}
      </div>
    );
  }
}
