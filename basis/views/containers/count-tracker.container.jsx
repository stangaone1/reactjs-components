import React, { Component } from 'react';
import CountTracker from 'views/components/count-tracker';

class CountTrackerContainer extends Component {
  render() {
    return (
        <div>
          <CountTracker current={1} max={5} /><br/>
          <CountTracker current={2} max={5} /><br/>
          <CountTracker current={4} max={5} separator=" / " /><br/>
          <CountTracker current={5} max={5} separator=" of " /><br/>
        </div>
    );
  }
}

export default CountTrackerContainer;
