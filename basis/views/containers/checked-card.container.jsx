import React, {Component} from 'react';
import FacilitiesCard from 'views/components/checked-card';

export default class FacilitiesCardContainer extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      checked: true,
    };
  }

  onChange() {
    this.setState({checked: !this.state.checked});
  }

  render() {
    return (
      <div>
        <FacilitiesCard
          onChange={this.onChange}
          title="asdf sdf"
          subtitle="dsfa sda fdjksnk"
          icon="attachment"
          checked={this.state.checked}
          id="0"
        />
      </div>
    );
  }
}
